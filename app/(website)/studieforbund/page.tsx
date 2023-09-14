import { getAssociationsPage } from "lib/sanity.fetch";
import { privacyQuery } from "lib/sanity.queries";
import { defineMetadata } from "lib/utils.metadata";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { LiveQuery } from "next-sanity/preview/live-query";

import AssociationsPage from "./AssociationsPage";
import AssociationsPagePreview from "./AssociationsPagePreview";

export async function generateMetadata(): Promise<Metadata> {
  const data = (await getAssociationsPage()) || {};

  return defineMetadata({
    title: "Studieforbund",
    description: data.description,
  });
}

export default async function Page() {
  const data = (await getAssociationsPage()) || {};

  if (!data && !draftMode().isEnabled) {
    return <div className="text-center">Siden er ikke satt opp ennå.</div>;
  }

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={privacyQuery}
      initialData={data}
      as={AssociationsPagePreview}
    >
      <AssociationsPage data={data} />
    </LiveQuery>
  );
}
