import { Metadata } from "next";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { allActiveCountiesQuery } from "@/sanity/lib/queries";
import { loadQuery } from "@/sanity/loader/loadQuery";
import { CountyListItemPayload } from "@/types";

import { CountiesIndexPageLayout } from "@/components/pages/counties-index-page";

const CountiesIndexPagePreview = dynamic(() => import("./preview"));

export const metadata: Metadata = { title: "Fylker" };

export default async function CountiesIndexPage() {
  const initial = await loadQuery<CountyListItemPayload[]>(
    allActiveCountiesQuery,
  );

  if (draftMode().isEnabled)
    return <CountiesIndexPagePreview initial={initial} />;

  return <CountiesIndexPageLayout data={initial.data} />;
}
