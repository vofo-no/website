import { Metadata } from "next";
import { loadAllCounties } from "@/sanity/loader/loadQuery";

import { CountiesIndexPageLayout } from "@/components/pages/counties-index-page";

export const metadata: Metadata = { title: "Fylker" };

export default async function CountiesIndexPage() {
  const data = await loadAllCounties();

  return <CountiesIndexPageLayout data={data} />;
}
