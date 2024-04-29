import { loadSettings } from "@/sanity/loader/loadQuery";

import { SiteFooterLayout } from "./layout";

export async function SiteFooter() {
  const data = await loadSettings();

  return <SiteFooterLayout data={data} />;
}
