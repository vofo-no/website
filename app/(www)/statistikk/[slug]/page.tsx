import fs from "fs";
import path from "path";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { allActiveCountiesQuery } from "@/sanity/lib/queries";
import { glob } from "glob";

import { StatisticsPageLayout } from "@/components/pages/statistics-page";

interface SlugStatisticsPageProps {
  params: {
    slug: string;
  };
}

async function getDataFile(slug: string) {
  const dataFile = await glob(`data/*/${slug}.json`, {
    dotRelative: true,
    posix: true,
  }).then((files) => files.sort((a, b) => a.localeCompare(b))[0]);

  if (!dataFile) notFound();

  const file = fs.readFileSync(path.resolve(dataFile), "utf-8");

  return JSON.parse(file);
}

export async function generateMetadata({
  params: { slug },
}: SlugStatisticsPageProps): Promise<Metadata> {
  const data = await getDataFile(slug);

  return {
    title: `Statistikk for ${data.title}`,
    description: `Oversikt over studieforbundenes kursaktivitet, medlemsorganisasjoner og bruk av statstilskudd i ${data.description}`,
  };
}

export const dynamicParams = false;
export async function generateStaticParams() {
  const data = await client.fetch<{ slug: string }[]>(allActiveCountiesQuery);

  return data.map((item) => ({
    slug: item.slug,
  }));
}

export default async function SlugStatisticsPage({
  params: { slug },
}: SlugStatisticsPageProps) {
  const data = await getDataFile(slug);

  return <StatisticsPageLayout data={data} />;
}
