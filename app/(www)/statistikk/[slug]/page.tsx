import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { allActiveCountiesQuery } from "@/sanity/lib/queries";

import { getDataFile } from "@/lib/getDataFile";
import { StatisticsPageLayout } from "@/components/pages/statistics-page";

interface SlugStatisticsPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params: { slug },
}: SlugStatisticsPageProps): Promise<Metadata> {
  const data = await getDataFile(slug);

  return {
    title: `Statistikk for ${data.title}`,
    description: `Oversikt over studieforbundenes kursaktivitet, medlemsorganisasjoner og bruk av statstilskudd i ${data.title}`,
  };
}

export const dynamic = "force-static";
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
