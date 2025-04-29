import type { QueryParams } from "next-sanity";

import { client } from "./client";

export async function sanityFetch<QueryResponse>(
  {
    query,
    params = {},
    tags = [],
  }: {
    query: string;
    params?: QueryParams;
    tags?: string[];
  }
) {
  return client.fetch<QueryResponse>(query, params, {
    next: { revalidate: tags.length ? false : 120, tags },
  });
}
