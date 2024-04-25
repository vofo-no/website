import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { allActiveCountiesQuery, allActiveSfQuery } from "@/sanity/lib/queries";

import { getDataFile } from "@/lib/getDataFile";
import { StatisticsPageLayout } from "@/components/pages/statistics-page";

import { excludeSlugs } from "../excludeSlugs";

interface SlugStatisticsPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params: { slug },
}: SlugStatisticsPageProps): Promise<Metadata> {
  const data = await getDataFile(slug);

  const { title } = data ?? {};

  return {
    title: `Statistikk for ${title}`,
    description: `Oversikt over kursaktivitet, medlemsorganisasjoner og bruk av statstilskudd i ${title}`,
  };
}

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const [counties, sfs] = await Promise.all([
    client.fetch<{ slug: string }[]>(allActiveCountiesQuery),
    client.fetch<{ slug: string }[]>(allActiveSfQuery),
  ]);

  return [...counties, ...sfs]
    .filter((item) => !excludeSlugs.includes(item.slug))
    .map((item) => ({
      slug: item.slug,
    }));
}

export default async function SlugStatisticsPage({
  params: { slug },
}: SlugStatisticsPageProps) {
  const data = await getDataFile(slug);

  if (!data) notFound();

  return <StatisticsPageLayout data={data} />;
}
