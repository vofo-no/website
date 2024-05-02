import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

import { IndexableDocument, replaceAllObjects } from "./write";

console.log("Henter dokumenter...");
client
  .fetch<IndexableDocument[]>(
    groq`
*[_type in ["post", "county", "topic", "page"] && (!defined(active) || active == true) && defined(slug)][]{
    "objectID": _id,
    _type,
    "slug": slug.current,
    "title": coalesce(name, title),
    description,
    "body": pt::text(body),
    image,
}`,
  )
  .then((documents) => {
    console.log(`Fant ${documents.length} dokumenter.`);

    replaceAllObjects(documents)
      .then(({ objectIDs }) => {
        console.log(`Oppdatert ${objectIDs.length} objekter.`);
      })
      .catch((err) => console.error(err));
  });
