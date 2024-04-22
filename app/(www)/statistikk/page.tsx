import fs from "fs";
import path from "path";
import { glob } from "glob";

import { StatisticsPageLayout } from "@/components/pages/statistics-page";

export const dynamic = "force-static";

async function getDataFile() {
  const dataFile = await glob(`data/*/nasjonal.json`, {
    dotRelative: true,
    posix: true,
  }).then((files) => files.sort((a, b) => a.localeCompare(b))[0]);

  const file = fs.readFileSync(path.resolve(dataFile), "utf-8");

  return JSON.parse(file);
}

export default async function StatisticsPage() {
  const data = await getDataFile();
  return <StatisticsPageLayout data={data} />;
}
