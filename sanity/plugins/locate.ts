import { map } from "rxjs";
import { DocumentLocationResolver } from "sanity/presentation";

export const locate: DocumentLocationResolver = (params, context) => {
  if (params.type === "post") {
    const doc$ = context.documentStore.listenQuery(
      `*[_id == $id][0]{slug,title}`,
      params,
      { perspective: "previewDrafts" }, // returns a draft article if it exists
    );
    return doc$.pipe(
      map((doc) => {
        if (!doc || !doc.slug?.current) {
          return null;
        }
        return {
          locations: [
            {
              title: doc.title || "(uten tittel)",
              href: `/aktuelt/${doc.slug.current}`,
            },
            {
              title: "Dokument- og nyhetsarkiv",
              href: "/aktuelt/",
            },
          ],
        };
      }),
    );
  }
  return null;
};
