import { defineLive } from "next-sanity/live";

import { client } from "./client";
import { token } from "./token";

export const { sanityFetch: sanityLiveFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
