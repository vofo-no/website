import type {
  PortableTextBlock,
  Reference,
  Image as SanityImage,
} from "sanity";

export interface Image extends SanityImage {
  alt: string;
  credit?: string;
  caption?: string;
}

export interface SettingsPayload {
  officeAddress: string;
  postalAddress?: string;
  email: string;
  phone: string;
  about: {
    title: string;
    href: string;
  }[];
  shortcuts: {
    title: string;
    href: string;
  }[];
  some: {
    title: string;
    href: string;
  }[];
}

export interface HomePayload {
  title: string;
  description: string;
  announcement?: {
    emoji?: string;
    title: string;
    href: string;
  };
}

export interface PostListItemPayload {
  _id: string;
  _docType: string;
  title: string;
  description: string;
  image?: Image;
  publishedAt: string;
  _updatedAt?: string;
  slug: string;
  relevance?: {
    _id: string;
    _type: string;
    title: string;
    slug: string;
  }[];
}

export interface PostPayload extends Omit<PostListItemPayload, "relevance"> {
  body: PortableTextBlock[];
  toc: PortableTextBlock[];
  docType: string;
  attachment?: string;
  remoteUrl?: string;
  locale?: string;
  relevance?: Reference[];
}

interface DocumentListItemPayload {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  image?: Image;
}

export interface CountyListItemPayload extends DocumentListItemPayload {}

export interface CountyPayload extends CountyListItemPayload {
  body: PortableTextBlock[];
  contacts?: Reference[];
  countyCode?: string[];
  locale?: string;
}

export interface TopicListItemPayload extends DocumentListItemPayload {
  county: Reference;
}

export interface TopicPayload extends TopicListItemPayload {
  body: PortableTextBlock[];
  toc: PortableTextBlock[];
  contacts?: Reference[];
  locale?: string;
}

export interface PagePayload {
  title: string;
  slug: string;
  _updatedAt?: string;
  description?: string;
  body: PortableTextBlock[];
  toc: PortableTextBlock[];
  image?: Image;
  contacts?: Reference[];
  locale?: string;
}

export interface PersonPayload {
  _id: string;
  name: string;
  position?: string;
  image?: Image;
  email?: string;
  phone?: string;
}

export interface DocumentLinkPayload {
  _type: string;
  slug: string;
  title: string;
  description?: string;
  image?: Image;
}
