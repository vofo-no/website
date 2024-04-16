import fs from "fs";

const LOWEST_YEAR = 2015;

enum tableId {
  fylker = 104,
  kommuner = 131,
}

interface IKlassCodes {
  codes: {
    code: string;
    name: string;
  }[];
}

interface IKlassChanges {
  codeChanges: {
    oldCode: string;
    oldName: string;
    newCode: string;
    newName: string;
    changeOccurred: string;
  }[];
}

async function klassApiFetch(
  tableId: tableId,
  year: number,
): Promise<[{ code: string; name: string }[], { [key: string]: string }]> {
  const data: IKlassCodes = await fetch(
    `https://data.ssb.no/api/klass/v1/classifications/${tableId}/codesAt.json?date=${year}-12-31`,
  ).then((res) => res.json());

  const changes: { [key: string]: string } = {};

  for (let i = 1; i < 8; i++) {
    const changesData: IKlassChanges = await fetch(
      `https://data.ssb.no/api/klass/v1/classifications/${tableId}/changes.json?from=${year - i}-01-01&to=${year + 1}-01-01`,
    ).then((res) => res.json());

    changesData.codeChanges
      .filter((item) => item.newCode !== item.oldCode)
      .forEach((item) => (changes[item.oldCode] = item.newCode));
  }

  return [
    data.codes
      .filter((item) => item.code !== "99" && item.code !== "9999")
      .map(({ code, name }) => ({
        code,
        name,
      })),
    changes,
  ];
}

async function folketallFetch(codes: string[], year: number) {
  const data = await fetch("https://data.ssb.no/api/v0/no/table/06913", {
    method: "POST",
    body: JSON.stringify({
      query: [
        {
          code: "Region",
          selection: {
            filter: "item",
            values: codes,
          },
        },
        {
          code: "ContentsCode",
          selection: {
            filter: "item",
            values: ["Folkemengde"],
          },
        },
        {
          code: "Tid",
          selection: {
            filter: "item",
            values: [`${year}`],
          },
        },
      ],
      response: {
        format: "json-stat2",
      },
    }),
  }).then((res) => res.json());

  let result: Record<string, number> = {};

  Object.entries<number>(data.dimension.Region.category.index).forEach(
    ([key, value]) => (result[key] = data.value[value]),
  );

  return result;
}

function createFolderIfNotExists(folderName: string) {
  if (!fs.existsSync(folderName)) fs.mkdirSync(folderName);
}

export async function SsbUtil(
  yearArg: string,
  options: { force?: boolean } = {},
) {
  const year = Number(yearArg);

  if (year < LOWEST_YEAR || year > new Date().getFullYear()) {
    console.error("Year out of bounds");
    return;
  }

  const dataFolder = `data/${year}`;

  if (!options.force) {
    if (
      fs.existsSync(`${dataFolder}/ssb.json`) ||
      fs.existsSync(`${dataFolder}/studieforbund`) ||
      fs.existsSync(`${dataFolder}/emne`) ||
      fs.existsSync(`${dataFolder}/fylke`) ||
      fs.existsSync(`${dataFolder}/kommune`)
    ) {
      console.error(
        `Det finnes allerede data i ${dataFolder}. Bruk -- --force for å overskrive.`,
      );
      return;
    }
  }

  createFolderIfNotExists(dataFolder);
  createFolderIfNotExists(`${dataFolder}/studieforbund`);
  createFolderIfNotExists(`${dataFolder}/emne`);
  createFolderIfNotExists(`${dataFolder}/fylke`);
  createFolderIfNotExists(`${dataFolder}/kommune`);

  const [klassdata, changes] = await Promise.all([
    klassApiFetch(tableId.fylker, year),
    klassApiFetch(tableId.kommuner, year),
  ]).then(
    ([[a, aChanges], [b, bChanges]]) =>
      [a.concat(b), { ...aChanges, ...bChanges }] as [
        {
          code: string;
          name: string;
        }[],
        {
          [key: string]: string;
        },
      ],
  );

  const folketall = await folketallFetch(
    klassdata.map((item) => item.code),
    year,
  );

  const wstream = fs.createWriteStream(`${dataFolder}/ssb.json`);
  wstream.write(
    JSON.stringify(
      klassdata
        .map(({ code, name }) => ({
          name,
          code: Number(code),
          pop: folketall[code],
        }))
        .concat([{ code: 2100, name: "Svalbard", pop: 2500 }]),
    ),
  );
  wstream.end();

  const wstream2 = fs.createWriteStream(`${dataFolder}/recode.json`);
  wstream2.write(JSON.stringify(changes));
  wstream2.end();
}
