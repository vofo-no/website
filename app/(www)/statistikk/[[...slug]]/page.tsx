import { Metadata } from "next";
import { notFound } from "next/navigation";
import dataIndexV2 from "@/data/index-v2.json";

import { StatisticsPageLayout } from "@/components/pages/statistics-page";

import {
  defaultStatistikkParams,
  parseSlugs,
  resolveStatisticUrl,
} from "../utils";

interface SlugStatisticsPageProps {
  params: {
    slug?: string[];
  };
}

export function generateMetadata({
  params: { slug },
}: SlugStatisticsPageProps): Metadata {
  const params = parseSlugs(slug);
  const index =
    dataIndexV2.find(
      (item) => item.slug === `${params.sf}/${params.fylke}/${params.aar}`,
    ) || notFound();

  return {
    title: `Statistikk for ${index.name || "studieforbund"}`,
    description: `Oversikt over kursaktivitet, medlemsorganisasjoner og bruk av statstilskudd i ${index.name || "studieforbundene"}`,
  };
}

export function generateStaticParams() {
  const currentYear = Number(defaultStatistikkParams.aar);
  const slugs = dataIndexV2
    .filter((item) => item.year === currentYear)
    .map((item) => {
      const rawSlug = item.slug.split("/");
      const params = parseSlugs(rawSlug);
      const href = resolveStatisticUrl(params).slice(12);
      return { slug: href.split("/") };
    });

  return slugs;
}

export default async function SlugStatisticsPage({
  params: { slug },
}: SlugStatisticsPageProps) {
  const params = parseSlugs(slug);
  const index =
    dataIndexV2.find(
      (item) => item.slug === `${params.sf}/${params.fylke}/${params.aar}`,
    ) || notFound();

  const data = await fetch(index.url, {
    cache: "force-cache",
    next: { revalidate: false, tags: [`statisticsDataFile:${params.aar}`] },
  }).then((res) => res.json());

  return <StatisticsPageLayout data={data} />;
}
