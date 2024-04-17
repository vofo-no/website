import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { glob } from "glob";

import { StatisticsPageLayout } from "@/components/pages/statistics-page";

async function getDataFile() {
  const dataFile = await glob(`data/*/nasjonal.json`, {
    dotRelative: true,
    posix: true,
  }).then((files) => files.sort((a, b) => a.localeCompare(b))[0]);

  if (!dataFile) notFound();

  const file = fs.readFileSync(path.resolve(dataFile), "utf-8");

  return JSON.parse(file);
}

export default async function StatisticsPage() {
  const data = await getDataFile();
  return <StatisticsPageLayout data={data} />;
}
