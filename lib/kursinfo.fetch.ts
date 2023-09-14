import { IDataFile } from "types/kursinfo";

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
