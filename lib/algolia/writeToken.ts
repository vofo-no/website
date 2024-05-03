import { assertValue } from "@/lib/assertValue";

export const writeToken = assertValue(
  process.env.ALGOLIA_WRITE_TOKEN,
  "Missing environment variable: ALGOLIA_WRITE_TOKEN",
);
