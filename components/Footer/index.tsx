import { getSettings } from "lib/sanity.fetch";

import FooterLayout from "./FooterLayout";

export async function Footer() {
  const data = await getSettings();

  return <FooterLayout data={data} />;
}
