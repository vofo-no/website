import { Metadata } from "next";
import { notFound } from "next/navigation";
import dataIndex from "@/data/index.json";

import { StatisticsPageLayout } from "@/components/pages/statistics-page";

interface SlugStatisticsPageProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({
  params: { slug },
}: SlugStatisticsPageProps): Metadata {
  const data = dataIndex
    .filter((item) => item.slug === slug)
    .sort((a, b) => b.year - a.year)[0];

  const { name } = data ?? {};

  return {
    title: `Statistikk for ${name}`,
    description: `Oversikt over kursaktivitet, medlemsorganisasjoner og bruk av statstilskudd i ${name}`,
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = [...new Set(dataIndex.map((item) => ({ slug: item.slug })))];

  return slugs;
}

export default async function SlugStatisticsPage({
  params: { slug },
}: SlugStatisticsPageProps) {
  const index =
    dataIndex
      .filter((item) => item.slug === slug)
      .sort((a, b) => b.year - a.year)[0] || notFound();

  const data = await fetch(index.url).then((res) => res.json());

  return <StatisticsPageLayout data={data} />;
}
