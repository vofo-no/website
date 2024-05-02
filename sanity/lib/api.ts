import { assertValue } from "@/lib/assertValue";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET",
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
);

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-06-21";

export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET;

export const studioUrl = "/studio";
