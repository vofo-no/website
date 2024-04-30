import { Metadata } from "next";

import { preload } from "@/lib/getDataFile";
import { StatisticsPageLayout } from "@/components/pages/statistics-page";

export const metadata: Metadata = {
  title: `Statistikk`,
  description: `Oversikt over studieforbundenes kursaktivitet, medlemsorganisasjoner og bruk av statstilskudd i hele landet.`,
};

export default async function StatisticsPage() {
  preload("nasjonal");

  return <StatisticsPageLayout slug="nasjonal" />;
}
