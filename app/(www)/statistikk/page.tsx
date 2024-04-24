import { Metadata } from "next";

import { getDataFile } from "@/lib/getDataFile";
import { StatisticsPageLayout } from "@/components/pages/statistics-page";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `Statistikk`,
  description: `Oversikt over studieforbundenes kursaktivitet, medlemsorganisasjoner og bruk av statstilskudd i hele landet.`,
};

export default async function StatisticsPage() {
  const data = await getDataFile("nasjonal");

  return <StatisticsPageLayout data={data} />;
}
