import { assertValue } from "@/lib/assertValue";

export const indexName = assertValue(
  process.env.NEXT_PUBLIC_ALGOLIA_INDEX,
  "Missing environment variable: NEXT_PUBLIC_ALGOLIA_INDEX",
);

export const appId = assertValue(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  "Missing environment variable: NEXT_PUBLIC_ALGOLIA_APP_ID",
);

export const searchToken = assertValue(
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_TOKEN,
  "Missing environment variable: NEXT_PUBLIC_ALGOLIA_SEARCH_TOKEN",
);

export const writeToken = assertValue(
  process.env.ALGOLIA_WRITE_TOKEN,
  "Missing environment variable: ALGOLIA_WRITE_TOKEN",
);
