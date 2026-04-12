import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import { createClient } from "next-sanity";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: { studioUrl },
});
