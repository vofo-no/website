import type { Image, PortableTextBlock } from "sanity";

type ImageType = Image & {
  alt: string;
  credit?: string;
  caption?: string;
};

type ColorSchemeType = "crimson" | "red" | "green" | "blue" | "teal";

export interface HomePagePayload {
  title?: string;
  description?: string;
  banner?: {
    title: string;
    description?: string;
    url?: string;
    colorScheme: ColorSchemeType;
    image: ImageType;
  };
}

export interface AssociationsPagePayload {
  description?: string;
  organizations?: Organization[];
  body?: PortableTextBlock[];
  toc?: PortableTextBlock[];
}

export interface Organization {
  _id: string;
  name: string;
  logo?: ImageType;
  image?: ImageType;
  email?: string;
  phone?: string;
  description?: string;
}

export interface MenuItem {
  title: string;
  url: string;
}

export interface Person {
  _id: string;
  name: string;
  title?: string;
  image?: ImageType;
  email?: string;
  phone?: string;
}

export interface PersonItem {
  person: Person;
  title?: string;
}

export interface SettingsPayload {
  address?: string;
  phone?: string;
  email?: string;
  some?: MenuItem[];
  ogImage?: Image;
}

export interface PrivacyPayload {
  privacy?: PortableTextBlock[];
}

export interface PagePayload {
  title: string;
  description?: string;
  body?: PortableTextBlock[];
  toc?: PortableTextBlock[];
}

type ItemBase = {
  _id: string;
  _updatedAt?: string;
  slug: string;
};

type ContactItemType = {
  _id: string;
  job: string;
  person: {
    name: string;
    email?: string;
    phone?: string;
    image: ImageType;
  };
};

export type RegionItemType = ItemBase & {
  _type: "region";
  name: string;
  description?: string;
  image?: ImageType;
  contacts?: Array<ContactItemType>;
  news?: Array<NewsItemType>;
  calendar?: Array<CalendarItemType>;
};

export type TopicItemType = ItemBase & {
  _type: "topic";
  name: string;
  contacts?: Array<ContactItemType>;
};

export type CalendarItemType = ItemBase & {
  _type: "event";
  title: string;
  description: string;
  start: string;
  end: string;
  location?: { name?: string };
};

type NewsItemBase = ItemBase & {
  docType?: string;
  title: string;
  description: string;
  image: ImageType;
  publishedAt: string;
  body?: Array<any>;
  relevance?: Array<RegionItemType>;
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
export function getNavigation(preview: boolean) {
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
