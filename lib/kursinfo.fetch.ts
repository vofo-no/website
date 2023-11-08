import { IDataFile, INamed } from "types/kursinfo";

const PATH_REGEX = /[^a-z0-9æøå\s-]/g;

/** From https://github.com/vofo-no/kursinfo/blob/main/lib/parameterize.js */
function parameterize(str: string) {
  return String(str)
    .toLowerCase()
    .replace(PATH_REGEX, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/[æå]/g, "a")
    .replace(/ø/g, "o");
}

async function getKursInfoYears() {
  const res = await fetch(
    "https://raw.githubusercontent.com/vofo-no/kursinfo/main/data/index.json"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json().then((data) => (data?.years as string[]) || []);
}

async function getKursInfo(year: string): Promise<IDataFile> {
  const res = await fetch(
    `https://raw.githubusercontent.com/vofo-no/kursinfo/main/data/${year}.json`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getAssociationsInfo(): Promise<Record<string, INamed>> {
  const res = await fetch(
    "https://raw.githubusercontent.com/vofo-no/kursinfo/main/data/names/associations.json"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getOrganizationsInfo(): Promise<
  Record<string, Record<string, Record<string, INamed | null>>>
> {
  const res = await fetch(
    "https://raw.githubusercontent.com/vofo-no/kursinfo/main/data/names/organizations.json"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getParamFromSsbCode(ssbCode: string) {
  const data = await getAssociationsInfo();

  const short = data[ssbCode].short;

  return short ? parameterize(short) : undefined;
}

export async function getExtendedInfoFromSsbCode(ssbCode: string) {
  const [param, organizationsInfo] = await Promise.all([
    getParamFromSsbCode(ssbCode),
    getOrganizationsInfo(),
  ]);

  if (!param) return undefined;

  const currentYear = new Date().getFullYear();

  const organizations: Record<string, INamed> = {};
  Object.keys(organizationsInfo[ssbCode]).map((year) => {
    if (Number(year) > currentYear) return;

    Object.entries(organizationsInfo[ssbCode][year]).forEach(([key, value]) => {
      if (value === null) {
        delete organizations[key];
      } else {
        organizations[key] = value;
      }
    });
  });

  return {
    param,
    organizations,
  };
}

export async function getQuickKursInfo(key = "all") {
  const year = await getKursInfoYears().then((years) => years[0]);
  const report = await getKursInfo(year).then((data) => data.reports[key]);

  const { courses, hours, participants, name } = report;

  return {
    courses,
    hours,
    participants: participants.females + participants.males,
    name,
    year,
  };
}
