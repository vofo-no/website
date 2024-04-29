import { Metadata } from "next";
import { loadAllTopics } from "@/sanity/loader/loadQuery";

import { TopicsIndexPageLayout } from "@/components/pages/topics-index";

export const metadata: Metadata = { title: "Tema" };

export default async function TopicsIndexPage() {
  const data = await loadAllTopics();

  return <TopicsIndexPageLayout data={data} />;
}
