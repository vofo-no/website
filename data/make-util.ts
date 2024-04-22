import fs from "fs";
import { client } from "@/sanity/lib/client";
import { desc, escape, loadCSV, loadJSON, op } from "arquero";
import ColumnTable from "arquero/dist/types/table/column-table";
import { groq } from "next-sanity";

const LOWEST_YEAR = 2015;

// Til vi får data om disse
const excludeSF = [2501, 2503, 2538, 2545];

enum col {
  aar = "aar",
  dager = "d",
  deltakere = "delt",
  deltakere_10 = "delt1",
  deltakere_20 = "delt2",
  deltakere_30 = "delt3",
  deltakere_40 = "delt4",
  deltakere_50 = "delt5",
  deltakere_60 = "delt6",
  deltakere_kvinner = "deltk",
  deltakere_menn = "deltm",
  deltakere_bin = "deltb",
  eksamen = "eks",
  emne = "emne",
  fylke = "fylke",
  fylke_navn = "fnavn",
  fylke_pop = "fpop",
  id = "id",
  kommune = "kom",
  kommune_nr = "knr",
  kommune_navn = "knavn",
  kommune_pop = "kpop",
  kvinner_10 = "k1",
  kvinner_20 = "k2",
  kvinner_30 = "k3",
  kvinner_40 = "k4",
  kvinner_50 = "k5",
  kvinner_60 = "k6",
  kvinner_trt = "ktr",
  menn_10 = "m1",
  menn_20 = "m2",
  menn_30 = "m3",
  menn_40 = "m4",
  menn_50 = "m5",
  menn_60 = "m6",
  menn_trt = "mtr",
  niva = "niva",
  organisasjon = "org",
  sluttdato = "til",
  startdato = "fra",
  studieforbund = "sf",
  sforg = "sforg",
  tidspunkt = "tid",
  timer = "t",
  timer_digital = "td",
  timer_trt = "tt",
}

function parseDate(value: string) {
  const parts = value.split(".");
  const dateParts = [
    parts[2].length < 4 ? `20${parts[2]}` : parts[2],
    parts[1],
    parts[0],
  ];

  const date = new Date(Date.parse(dateParts.join("-")));
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

  return date;
}

async function loadData(year: number, recode?: Record<string, string>) {
  const table = await loadCSV(`data/raw/g${year}.csv`, {
    delimiter: ";",
    decimal: ",",
    header: false,
    names: [
      col.studieforbund,
      col.organisasjon,
      col.kommune,
      col.id,
      col.emne,
      col.niva,
      col.eksamen,
      col.menn_10,
      col.menn_20,
      col.menn_30,
      col.menn_40,
      col.menn_50,
      col.menn_60,
      col.kvinner_10,
      col.kvinner_20,
      col.kvinner_30,
      col.kvinner_40,
      col.kvinner_50,
      col.kvinner_60,
      col.menn_trt,
      col.kvinner_trt,
      col.startdato,
      col.sluttdato,
      col.timer,
      col.timer_digital,
      col.tidspunkt,
    ],
    parse: {
      [col.startdato]: parseDate,
      [col.sluttdato]: parseDate,
    },
  });

  return table
    .filter(
      escape(
        (d: { [x: string]: number }) =>
          !excludeSF.includes(d[col.studieforbund]),
      ),
    )
    .derive({
      [col.kommune]: escape((d: { [x: string]: any }) =>
        recode
          ? Number(recode[String(d[col.kommune])]) || d[col.kommune]
          : d[col.kommune],
      ),
    })
    .derive({
      [col.aar]: year,
      [col.fylke]: (d) => op.bin(d![col.kommune], 0, 9999, 100) / 100,
      [col.deltakere_kvinner]: (d) =>
        d![col.kvinner_10] +
        d![col.kvinner_20] +
        d![col.kvinner_30] +
        d![col.kvinner_40] +
        d![col.kvinner_50] +
        d![col.kvinner_60],
      [col.deltakere_menn]: (d) =>
        d![col.menn_10] +
        d![col.menn_20] +
        d![col.menn_30] +
        d![col.menn_40] +
        d![col.menn_50] +
        d![col.menn_60],
      [col.deltakere_10]: (d) => d![col.kvinner_10] + d![col.menn_10],
      [col.deltakere_20]: (d) => d![col.kvinner_20] + d![col.menn_20],
      [col.deltakere_30]: (d) => d![col.kvinner_30] + d![col.menn_30],
      [col.deltakere_40]: (d) => d![col.kvinner_40] + d![col.menn_40],
      [col.deltakere_50]: (d) => d![col.kvinner_50] + d![col.menn_50],
      [col.deltakere_60]: (d) => d![col.kvinner_60] + d![col.menn_60],
      [col.dager]: (d) =>
        (op.timestamp(d![col.sluttdato]) - op.timestamp(d![col.startdato])) /
          86400000 +
        1,
      [col.timer_trt]: escape((d: { [x: string]: any }) =>
        d[col.menn_trt] + d[col.kvinner_trt] > 0 ? d[col.timer] : 0,
      ),
      [col.sforg]: escape((d: any) =>
        [d![col.studieforbund], d![col.organisasjon]].join(":"),
      ),
    })
    .derive({
      [col.deltakere]: (d) =>
        d![col.deltakere_kvinner] + d![col.deltakere_menn],
    })
    .derive({
      [col.deltakere_bin]: (d) => op.bin(d![col.deltakere], 0, 40, 4),
    })
    .reify();
}

function getFirstCount(t: ColumnTable) {
  const obj = t.count().objects() as { count: number }[];
  return obj[0].count;
}

function makeReport(
  oneYear: ColumnTable,
  twoYears: ColumnTable,
  ssb: ColumnTable,
  title?: string,
) {
  const report = {
    title,
    summary: {
      // Mediandager
      // Maks dager
      ...oneYear
        .rollup({
          dager_q25: op.quantile(col.dager, 0.25),
          dager_median: op.median(col.dager),
          dager_q75: op.quantile(col.dager, 0.75),
          dager_maks: op.max(col.dager),
        })
        .objects()[0],

      // Emne etter antall deltakere
      // Emne etter deltakere kvinner, menn, aldersgrupper
      emner: oneYear
        .groupby(col.emne)
        .rollup({
          d: op.sum(col.deltakere),
          k: op.sum(col.deltakere_kvinner),
          m: op.sum(col.deltakere_menn),
          d1: op.sum(col.deltakere_10),
          d2: op.sum(col.deltakere_20),
          d3: op.sum(col.deltakere_30),
          d4: op.sum(col.deltakere_40),
          d5: op.sum(col.deltakere_50),
          d6: op.sum(col.deltakere_60),
        })
        .objects(),

      // Emne etter antall kurs <= 7 dager
      korte_kurs: oneYear
        .groupby(col.emne)
        .filter((d) => d![col.dager] <= 7)
        .rollup({
          kurs: op.count(),
        })
        .orderby(desc("kurs"))
        .objects(),

      // Emne etter antall kurs > 7 dager
      lange_kurs: oneYear
        .groupby(col.emne)
        .filter((d) => d![col.dager] > 7)
        .rollup({
          kurs: op.count(),
        })
        .orderby(desc("kurs"))
        .objects(),

      // Organisasjon etter antall kurs
      organisasjoner: oneYear
        .groupby(col.studieforbund, col.organisasjon)
        .rollup({
          kurs: op.count(),
        })
        .orderby(desc("kurs"))
        .objects(),

      // Kommuner etter antall kurs
      kommuner: oneYear
        .join(ssb, [col.kommune, "code"])
        .groupby(col.kommune)
        .rollup({
          kurs: op.count(),
          pop: op.any("pop"),
          navn: op.any("name"),
          delt: op.sum(col.deltakere),
        })
        .orderby(desc("kurs"))
        .objects(),

      kommunerAll: getFirstCount(ssb.filter((d) => d!["code"] > 99)),
      kommunerMissing: ssb
        .filter((d) => d!["code"] > 99)
        .antijoin(oneYear, ["code", col.kommune])
        .select({ name: "navn" })
        .orderby("navn")
        .objects(),

      // Fylker etter antall kurs
      fylker: oneYear
        .join(ssb, [col.fylke, "code"])
        .groupby(col.fylke)
        .rollup({
          kurs: op.count(),
          pop: op.any("pop"),
          navn: op.any("name"),
          delt: op.sum(col.deltakere),
        })
        .orderby(desc("kurs"))
        .objects(),

      // Studieforbund etter antall kurs
      studieforbund: oneYear
        .groupby(col.studieforbund)
        .rollup({
          kurs: op.count(),
          timer: op.sum(col.timer),
          delt: op.sum(col.deltakere),
        })
        .orderby(desc("timer"))
        .objects(),

      kurs_bin: [
        // Antall kurs 1 dag
        {
          label: "1 dag",
          kurs: getFirstCount(oneYear.filter((d) => d![col.dager] <= 1)),
        },
        // Antall kurs 2-7 dager
        {
          label: "2-7 dager",
          kurs: getFirstCount(
            oneYear.filter((d) => d![col.dager] > 1 && d![col.dager] <= 7),
          ),
        },
        // Antall kurs 8-30 dager
        {
          label: "8-30 dager",
          kurs: getFirstCount(
            oneYear.filter((d) => d![col.dager] > 7 && d![col.dager] <= 30),
          ),
        },
        // Antall kurs 31-92 dager
        {
          label: "1-3 måneder",
          kurs: getFirstCount(
            oneYear.filter((d) => d![col.dager] > 30 && d![col.dager] <= 92),
          ),
        },
        // Antall kurs > 92-182 dager
        {
          label: "3-6 måneder",
          kurs: getFirstCount(
            oneYear.filter((d) => d![col.dager] > 92 && d![col.dager] <= 182),
          ),
        },
        // Antall kurs > 182 dager
        {
          label: "Over 6 måneder",
          kurs: getFirstCount(oneYear.filter((d) => d![col.dager] > 182)),
        },
      ],
    },

    // Antall kurs
    // Timer
    // Mediantime
    // Antall kursemner
    // Deltakere
    // Median deltakere
    // Deltakere kvinner, menn, aldersgrupper
    // Antall organisasjoner
    history: twoYears
      .groupby(col.aar)
      .rollup({
        kurs: op.count(),
        timer: op.sum(col.timer),
        timer_median: op.median(col.timer),
        emner: op.distinct(col.emne),
        deltakere: op.sum(col.deltakere),
        deltakere_median: op.median(col.deltakere),
        deltakere_kvinner: op.sum(col.deltakere_kvinner),
        deltakere_menn: op.sum(col.deltakere_menn),
        deltakere_10: op.sum(col.deltakere_10),
        deltakere_20: op.sum(col.deltakere_20),
        deltakere_30: op.sum(col.deltakere_30),
        deltakere_40: op.sum(col.deltakere_40),
        deltakere_50: op.sum(col.deltakere_50),
        deltakere_60: op.sum(col.deltakere_60),
        organisasjoner: op.distinct(col.sforg),
      })
      .objects() as Record<string, any>[],
    histogram: new Array<Record<string, any>>(),
  };

  // Antall kurs etter deltakere (grupper på 4 fra 0 opptil 40)
  const histogram = twoYears
    .groupby(col.aar, col.deltakere_bin)
    .rollup({
      kurs: op.count(),
    })
    .objects() as Record<string, any>[];

  const y0 = report.history[0].aar;
  const y1 = report.history[1].aar;
  const histogramStep = 4;

  for (let i = 0; i < 10; i++) {
    const target = i === 9 ? Infinity : i * histogramStep;

    report.histogram.push({
      label: i === 9 ? "40+" : `${i * histogramStep}-${i * histogramStep + 3}`,
      [y0]:
        histogram.find(
          (bin) => bin[col.aar] === y0 && bin[col.deltakere_bin] === target,
        )?.kurs ?? 0,
      [y1]:
        histogram.find(
          (bin) => bin[col.aar] === y1 && bin[col.deltakere_bin] === target,
        )?.kurs ?? 0,
    });
  }

  // Antall kurs <= 7 dager
  const korte_kurs = twoYears
    .groupby(col.aar)
    .filter((d) => d![col.dager] <= 7)
    .rollup({ kurs: op.count() })
    .objects() as { aar: number; kurs: number }[];

  // Antall kurs > 7 dager
  const lange_kurs = twoYears
    .groupby(col.aar)
    .filter((d) => d![col.dager] > 7)
    .rollup({ kurs: op.count() })
    .objects() as { aar: number; kurs: number }[];

  report.history = report.history.map((hist) => ({
    korte_kurs: korte_kurs.find((k) => k.aar === hist["aar"])?.kurs,
    lange_kurs: lange_kurs.find((k) => k.aar === hist["aar"])?.kurs,
    ...hist,
  }));

  return report;
}

export async function makeUtil(yearArg: string) {
  const year = Number(yearArg);

  if (year < LOWEST_YEAR || year > new Date().getFullYear()) {
    console.error("Year out of bounds");
    return;
  }

  const dataFolder = `data/${year}`;

  const recode = JSON.parse(
    fs.readFileSync(`${dataFolder}/recode.json`, "utf8"),
  );

  const ssb = await loadJSON(`${dataFolder}/ssb.json`, {});

  const data = await Promise.all([loadData(year), loadData(year - 1, recode)]);

  const shortData = data[0].concat(data[1]);

  const fylker = await client.fetch<
    { slug: string; name: string; countyCode: string[] }[]
  >(groq`
    *[_type == "county" && active == true && defined(countyCode)][]{
    "slug": slug.current,
    name,
    countyCode,
  }
`);

  fylker.map((fylke) => {
    const wstream2 = fs.createWriteStream(`data/${year}/${fylke.slug}.json`);
    const filters = fylke.countyCode.map(Number);
    wstream2.write(
      JSON.stringify(
        makeReport(
          data[0].filter(
            escape(
              (d: { [x: string]: number }) =>
                filters.includes(d[col.kommune]) ||
                filters.includes(d[col.fylke]),
            ),
          ),
          shortData.filter(
            escape(
              (d: { [x: string]: number }) =>
                filters.includes(d[col.kommune]) ||
                filters.includes(d[col.fylke]),
            ),
          ),
          ssb.filter(
            escape(
              (d: { [x: string]: string }) =>
                filters.includes(Number(d["code"])) ||
                filters.includes(Math.trunc(Number(d["code"]) / 100)),
            ),
          ),
          fylke.name,
        ),
      ),
    );
    wstream2.end();
  });

  const wstream = fs.createWriteStream(`data/${year}/nasjonal.json`);
  wstream.write(JSON.stringify(makeReport(data[0], shortData, ssb)));
  wstream.end();
}
