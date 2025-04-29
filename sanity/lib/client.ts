import {
  apiVersion,
  dataset,
  projectId,
  revalidateSecret,
  studioUrl,
} from "@/sanity/lib/api";
import { createClient } from "next-sanity";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: revalidateSecret ? false : true,
  stega: { studioUrl },
});
