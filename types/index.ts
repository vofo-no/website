import type { Image, PortableTextBlock, Reference } from "sanity";

export type ImageType = Image & {
  alt: string;
  credit?: string;
  caption?: string;
};

type ColorSchemeType = "crimson" | "red" | "green" | "blue" | "teal";
export type LocaleName = "nb-NO" | "nn-NO" | "en-US";

interface Storeable {
  _id: string;
  _type: string;
  _updatedAt?: string;
}

interface Selectable {
  slug: string;
}

interface Presentable {
  description?: string;
  title: string;
  image?: ImageType;
  locale?: LocaleName;
  publishedAt?: string;
}

interface Contactable {
  contacts?: Reference[];
}

interface ArticleBase extends Storeable, Selectable, Presentable {
  body?: PortableTextBlock[];
  relevance?: Array<Reference>;
  toc?: PortableTextBlock[];
}

interface Duration {
  end?: string;
  start?: string;
}

export interface HomePagePayload
  extends Pick<Presentable, "title" | "description"> {
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

export interface MenuItem {
  title: string;
  url: string;
}

export interface Tagged extends Storeable, Selectable {
  title?: string;
  name?: string;
}

export interface MiniDocument
  extends Pick<
    Publication,
    "_id" | "_type" | "docType" | "title" | "description" | "image" | "slug"
  > {}

export interface DocumentLinkItem {
  item: Reference;
}

export interface PersonItem {
  person: Reference;
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
  toc?: PortableTextBlock[];
  _updatedAt?: string;
}

export interface PagePayload {
  title: string;
  description?: string;
  body?: PortableTextBlock[];
  toc?: PortableTextBlock[];
}

export interface Article extends ArticleBase {
  _type: "article";
}

export interface County extends Omit<ArticleBase, "title">, Contactable {
  _type: "county";
  name: string;
  countyCode?: string;
}

export interface Organization extends Storeable {
  _type: "organization";
  name: string;
  logo?: ImageType;
  image?: ImageType;
  email?: string;
  phone?: string;
  description?: string;
}

export interface Person extends Storeable {
  _type: "person";
  name: string;
  title?: string;
  image?: ImageType;
  email?: string;
  phone?: string;
}

export interface Project extends ArticleBase, Contactable {
  _type: "project";
  duration?: Duration;
  active?: boolean;
}

export interface Publication extends ArticleBase {
  _type: "publication";
  docType?: string;
  attachment?: string;
  remoteUrl?: string;
}

export interface Topic extends ArticleBase, Contactable {
  _type: "topic";
}

export type NewsItemType = Article | Publication;

/*

type xItemBase = {
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
*/
