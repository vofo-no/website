import { getPageBySlug } from "lib/sanity.fetch";
import { pagesBySlugQuery } from "lib/sanity.queries";
import { defineMetadata } from "lib/utils.metadata";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { LiveQuery } from "next-sanity/preview/live-query";

import GenericPage from "./GenericPage";
import GenericPagePreview from "./GenericPagePreview";

interface Params {
  params: { slug: string[] };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const data = await getPageBySlug(params.slug.join("/"));

  return defineMetadata({
    title: data?.title,
    description: data?.description,
  });
}

export default async function Page({ params }: Params) {
  const slug = params.slug.join("/");
  const data = await getPageBySlug(slug);

  if (!data && !draftMode().isEnabled) {
    return <div className="text-center">Siden er ikke satt opp ennå.</div>;
  }

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={pagesBySlugQuery}
      params={{ slug }}
      initialData={data}
      as={GenericPagePreview}
    >
      <GenericPage data={data} />
    </LiveQuery>
  );
}
