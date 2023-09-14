import { getHomePage, getSettings } from "lib/sanity.fetch";
import { homePageQuery } from "lib/sanity.queries";
import { defineMetadata } from "lib/utils.metadata";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { LiveQuery } from "next-sanity/preview/live-query";

import HomePage from "./HomePage";
import HomePagePreview from "./HomePagePreview";

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

  if (!data && !draftMode().isEnabled) {
    return <div className="text-center">Forsiden er ikke satt opp ennå.</div>;
  }

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={homePageQuery}
      initialData={data}
      as={HomePagePreview}
    >
      <HomePage data={data} />
    </LiveQuery>
  );
}
