import { Metadata } from "next";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { loadAllTopics } from "@/sanity/loader/loadQuery";

import { TopicsIndexPageLayout } from "@/components/pages/topics-index";

const TopicsIndexPagePreview = dynamic(() => import("./preview"));

export const metadata: Metadata = { title: "Tema" };

export default async function TopicsIndexPage() {
  const initial = await loadAllTopics();

  if (draftMode().isEnabled)
    return <TopicsIndexPagePreview initial={initial} />;

  return <TopicsIndexPageLayout data={initial.data} />;
}
