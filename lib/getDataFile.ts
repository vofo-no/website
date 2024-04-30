import { cache } from "react";

import "server-only";

import { promises as fs } from "fs";
import path from "path";
import { StatisticsDataType } from "@/types";
import { glob } from "glob";

export const preload = (slug: string, year?: string) => {
  void getDataFile(slug, year);
};

export const getDataFile = cache(async (slug: string, year?: string) => {
  const dataFile = await glob(`data/${year || "*"}/${slug}.json`, {
    dotRelative: true,
    posix: true,
  }).then((files) => files.sort((a, b) => a.localeCompare(b))[0]);

  if (!dataFile) return undefined;

  const file = await fs.readFile(path.resolve(dataFile), "utf-8");

  return JSON.parse(file) as StatisticsDataType;
});
