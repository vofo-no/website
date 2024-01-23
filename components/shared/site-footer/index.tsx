import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { loadSettings } from "@/sanity/loader/loadQuery";

import { SiteFooterLayout } from "./layout";

const SiteFooterPreview = dynamic(() => import("./preview"));

export async function SiteFooter() {
  const initial = await loadSettings();

  if (draftMode().isEnabled) {
    return <SiteFooterPreview initial={initial} />;
  }

  return <SiteFooterLayout data={initial.data} />;
}
