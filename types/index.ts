import type { Image, PortableTextBlock, Reference } from "sanity";

export type ImageType = Image & {
  alt: string;
  credit?: string;
  caption?: string;
};

type ColorSchemeType = "crimson" | "red" | "green" | "blue" | "teal";

interface ItemBase {
  _id: string;
  _updatedAt?: string;
  type: string;
  slug: string;
}

interface ArticleBase extends ItemBase {
  title: string;
  description?: string;
  body?: PortableTextBlock[];
  toc?: PortableTextBlock[];
  publishedAt?: string;
  image?: ImageType;
}

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

export interface DocumentPayload
  extends Pick<
    PublicationPayload,
    "_id" | "_type" | "docType" | "title" | "description" | "image" | "slug"
  > {}

export interface DocumentLinkItem {
  item: Reference;
}

export interface PersonPayload {
  _id: string;
  name: string;
  title?: string;
  image?: ImageType;
  email?: string;
  phone?: string;
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

export interface County {
  _id: string;
  name: string;
  slug: string;
  image?: Image;
  description?: string;
  body?: PortableTextBlock[];
}

export type CountiesPayload = County[];

export interface PagePayload {
  title: string;
  description?: string;
  body?: PortableTextBlock[];
  toc?: PortableTextBlock[];
}

export interface PublicationPayload extends ArticleBase {
  _type: "publication";
  docType?: string;
  attachment?: string;
  remoteUrl?: string;
}

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
