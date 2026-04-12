import "server-only";

import { draftMode } from "next/headers";
import type { ClientReturn, QueryParams } from "next-sanity";

import { client } from "./client";
import { sanityLiveFetch } from "./live";

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  tags = [],
}: {
  query: QueryString;
  params?: QueryParams;
  tags: string[];
}): Promise<{
  data: ClientReturn<QueryString>;
}> {
  const isDraftMode = (await draftMode()).isEnabled;

  if (isDraftMode) {
    const { data } = await sanityLiveFetch({ query, params, tags });
    return { data };
  }

  const data = await client.fetch(query, params, {
    next: {
      revalidate: false,
      tags,
    },
  });
  return { data };
}
