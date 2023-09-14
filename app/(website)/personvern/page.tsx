import { getPrivacy } from "lib/sanity.fetch";
import { privacyQuery } from "lib/sanity.queries";
import { defineMetadata } from "lib/utils.metadata";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { LiveQuery } from "next-sanity/preview/live-query";

import PrivacyPage from "./PrivacyPage";
import PrivacyPagePreview from "./PrivacyPagePreview";

export async function generateMetadata(): Promise<Metadata> {
  return defineMetadata({
    title: "Personvernerklæring",
  });
}

export default async function Page() {
  const data = await getPrivacy();

  if (!data && !draftMode().isEnabled) {
    return <div className="text-center">Siden er ikke satt opp ennå.</div>;
  }

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={privacyQuery}
      initialData={data}
      as={PrivacyPagePreview}
    >
      <PrivacyPage data={data} />
    </LiveQuery>
  );
}
