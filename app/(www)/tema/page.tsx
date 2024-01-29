import { Metadata } from "next";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { allActiveTopicsQuery } from "@/sanity/lib/queries";
import { loadQuery } from "@/sanity/loader/loadQuery";
import { TopicListItemPayload } from "@/types";

import { TopicsIndexPageLayout } from "@/components/pages/topics-index";

const TopicsIndexPagePreview = dynamic(() => import("./preview"));

export const metadata: Metadata = { title: "Tema" };

export default async function TopicsIndexPage() {
  const initial = await loadQuery<TopicListItemPayload[]>(
    allActiveTopicsQuery,
    {},
    { next: { tags: [`topic`] } },
  );

  if (draftMode().isEnabled)
    return <TopicsIndexPagePreview initial={initial} />;

  return <TopicsIndexPageLayout data={initial.data} />;
}
