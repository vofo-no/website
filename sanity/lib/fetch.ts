import { draftMode } from "next/headers";
import type { ClientPerspective, QueryParams } from "next-sanity";

import { revalidateSecret } from "./api";
import { client } from "./client";
import { token } from "./token";

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  perspective = draftMode().isEnabled ? "drafts" : "published",
  stega = perspective === "drafts" || process.env.VERCEL_ENV === "preview",
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  perspective?: Omit<ClientPerspective, "raw">;
  stega?: boolean;
  tags?: string[];
}) {
  if (perspective === "drafts") {
    return client.fetch<QueryResponse>(query, params, {
      stega,
      perspective: "drafts",
      token,
      useCdn: false,
      next: { revalidate: 0 },
    });
  }
  return client.fetch<QueryResponse>(query, params, {
    stega,
    perspective: "published",
    useCdn: revalidateSecret ? false : true,
    next: { revalidate: tags.length ? false : 120, tags },
  });
}
