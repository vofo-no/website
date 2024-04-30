import { Metadata } from "next";
import { notFound } from "next/navigation";
import dataIndex from "@/data/index.json";

import { StatisticsPageLayout } from "@/components/pages/statistics-page";

export const metadata: Metadata = {
  title: `Statistikk`,
  description: `Oversikt over studieforbundenes kursaktivitet, medlemsorganisasjoner og bruk av statstilskudd i hele landet.`,
};

export default async function StatisticsPage() {
  const index =
    dataIndex
      .filter((item) => item.slug === "nasjonal")
      .sort((a, b) => b.year - a.year)[0] || notFound();

  const data = await fetch(index.url).then((res) => res.json());

  return <StatisticsPageLayout data={data} />;
}
