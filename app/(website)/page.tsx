import { getHomePage, getSettings } from "lib/sanity.fetch";
import { defineMetadata } from "lib/utils.metadata";
import { Metadata } from "next";

import HomePage from "./HomePage";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, page] = await Promise.all([getSettings(), getHomePage()]);

  return defineMetadata({
    description: page?.description,
    image: settings?.ogImage,
    title: [
      "Voksenopplæringsforbundet",
      ...(page?.title ? [page.title] : []),
    ].join(" – "),
  });
}

export default async function Page() {
  const data = await getHomePage();

  return <HomePage data={data} />;
}
