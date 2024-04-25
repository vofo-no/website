import { promises as fs } from "fs";
import path from "path";
import { StatisticsDataType } from "@/types";
import { glob } from "glob";

export async function getDataFile(slug: string) {
  const dataFile = await glob(`data/*/${slug}.json`, {
    dotRelative: true,
    posix: true,
  }).then((files) => files.sort((a, b) => a.localeCompare(b))[0]);

  if (!dataFile) return undefined;

  const file = await fs.readFile(path.resolve(dataFile), "utf-8");

  return JSON.parse(file) as StatisticsDataType;
}
