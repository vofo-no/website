import dataIndex from "@/data/index.json";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

import { resolveHref } from "../resolveHref";
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

    const currentYear = dataIndex[0].year;
    const statistics = dataIndex
      .filter((item) => item.year === currentYear)
      .map(({ slug, name }) => {
        return {
          _type: "statistic",
          title: ["Statistikk", name].filter(Boolean).join(" for "),
          slug,
          objectID: resolveHref("statistic", slug)!,
          description:
            "Oversikt over studieforbundenes kursaktivitet, medlemsorganisasjoner og bruk av statstilskudd",
        };
      });

    replaceAllObjects([...documents, ...statistics])
      .then(({ batchResponses }) => {
        const count = batchResponses.reduce(
          (prev, current) => prev + current.objectIDs.length,
          0,
        );
        console.log(`Oppdatert ${count} objekter.`);
      })
      .catch((err) => console.error(err));
  });
