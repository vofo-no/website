import { getPageBySlug } from "lib/sanity.fetch";
import { pagesBySlugQuery } from "lib/sanity.queries";
import { defineMetadata } from "lib/utils.metadata";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { LiveQuery } from "next-sanity/preview/live-query";

import AboutPage from "./AboutPage";
import AboutPagePreview from "./AboutPagePreview";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageBySlug("om-vofo");

  return defineMetadata({
    title: data?.title,
    description: data?.description,
  });
}

export default async function Page() {
  const data = await getPageBySlug("om-vofo");

  if (!data && !draftMode().isEnabled) {
    return <div className="text-center">Siden er ikke satt opp ennå.</div>;
  }

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={pagesBySlugQuery}
      params={{ slug: "om-vofo" }}
      initialData={data}
      as={AboutPagePreview}
    >
      <AboutPage data={data} />
    </LiveQuery>
  );
}
