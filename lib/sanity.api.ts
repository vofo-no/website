import { groq } from "next-sanity";

export const getNewsListItemsQuery = groq`
*[_type in ["article", "event", "publication"] && dateTime(publishedAt) < dateTime(now())] | order(publishedAt desc) [0...6] {
  _id,
  _type,
  docType,
  title,
  description,
  image,
  publishedAt,
  "slug": slug.current,
  start,
  end,
  location { name }
}
`;

export const getAllNewsItemsSlugsQuery = groq`
*[_type == $type && dateTime(publishedAt) < dateTime(now())] {
  "slug": slug.current,
}
`;

export const getNewsItemQuery = groq`
*[_type == $type && slug.current == $slug][0] {
  _id,
  _type,
  docType,
  title,
  description,
  image,
  publishedAt,
  _updatedAt,
  "slug": slug.current,
  start,
  end,
  location { name },
  body,
  "attachment": attachment.asset->url,
  remoteUrl,
  relevance[][0]->{ _type, name, "slug": slug.current, image, "contact": contacts[][0]->}
}
`;

type NewsItemBase = {
  _id: string;
  _updatedAt?: string;
  docType?: string;
  title: string;
  description: string;
  image: { alt?: string; attribution?: string; caption?: string };
  publishedAt: string;
  slug: string;
  body?: Array<any>;
};

export type EventNewsItem = NewsItemBase & {
  _type: "event";
  start: string;
  end: string;
  location?: { name?: string };
};

export type PublicationNewsItem = NewsItemBase & {
  _type: "publication";
  docType: string;
  attachment?: string;
  remoteUrl?: string;
};

export type ArticleNewsItem = NewsItemBase & {
  _type: "article";
};

export type NewsItemType =
  | ArticleNewsItem
  | EventNewsItem
  | PublicationNewsItem;

// MOCK
export async function getNavigation(preview: boolean) {
  return {
    categories: [
      {
        name: "Studieforbund",
        sections: [
          {
            name: "Kunnskap",
            items: [
              { name: "Om studieforbund", href: "#" },
              { name: "Statistikk", href: "#" },
              { name: "Forskning", href: "#" },
            ],
          },
          {
            name: "Regelverk",
            items: [
              { name: "Voksenopplæringsloven", href: "#" },
              { name: "Gratis lokaler", href: "#" },
              { name: "Tilskudd", href: "#" },
            ],
          },
          {
            name: "Godkjente studieforbund",
            items: [
              { name: "Akademisk studieforbund", href: "#" },
              { name: "Idrettens studieforbund", href: "#" },
              { name: "Kristelig studieforbund", href: "#" },
              { name: "Musikkens studieforbund", href: "#" },
              { name: "Samisk studieforbund", href: "#" },
              { name: "Senterpartiets studieforbund", href: "#" },
              { name: "Studieforbundet AOF", href: "#" },
              { name: "Studieforbundet Funkis", href: "#" },
              { name: "Studieforbundet kultur og tradisjon", href: "#" },
              { name: "Studieforbundet livslang læring", href: "#" },
              { name: "Studieforbundet natur og miljø", href: "#" },
              { name: "Studieforbundet næring og samfunn", href: "#" },
              { name: "Studieforbundet Solidaritet", href: "#" },
              { name: "Venstres studieforbund", href: "#" },
            ],
          },
        ],
      },
      {
        name: "Politikk",
        sections: [
          {
            name: "Politiske saker",
            items: [
              { name: "Demokrati og deltakelse", href: "#" },
              { name: "Kunnskap og kompetanse for alle", href: "#" },
              { name: "Statsbudsjettet", href: "#" },
              { name: "Alle politiske saker", href: "#" },
            ],
          },
          {
            name: "Planer og organisering",
            items: [
              { name: "Strategiplan", href: "#" },
              { name: "Styret", href: "#" },
              { name: "Uttalelser og innspill", href: "#" },
              { name: "Samarbeid og prosjekter", href: "#" },
            ],
          },
          {
            name: "Fylkesutvalg",
            items: [
              { name: "Troms og Finnmark", href: "#" },
              { name: "Nordland", href: "#" },
              { name: "Trøndelag", href: "#" },
              { name: "Møre og Romsdal", href: "#" },
              { name: "Vestland", href: "#" },
              { name: "Rogaland", href: "#" },
              { name: "Agder", href: "#" },
              { name: "Vestfold og Telemark", href: "#" },
              { name: "Innlandet", href: "#" },
              { name: "Oslo", href: "#" },
              { name: "Viken", href: "#" },
            ],
          },
        ],
      },
    ],
    pages: [
      { name: "Om Vofo", href: "#" },
      { name: "Ressurser", href: "#" },
    ],
  };
}
