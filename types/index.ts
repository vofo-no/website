import type dataSchema from "@/data/schema.json";
import type {
  FileAsset,
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
  contacts?: Reference[];
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
  docType: string;
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
  attachments?: FileAsset[];
  remoteUrl?: string;
  locale?: string;
  relevance?: Reference[];
  expiration?: {
    expiredAt?: string;
    explanation?: string;
  };
}

interface DocumentListItemPayload {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  image?: Image;
}

export interface OrganizationListItemPayload extends DocumentListItemPayload {}

export interface CalendarEntryPayload {
  _id: string;
  title: string;
  description?: string;
  duration: { start: string; end?: string };
  location?: { name?: string; address?: string };
  ownEvent?: boolean;
  relatedPost?: DocumentLinkPayload;
}

export interface CountyListItemPayload extends DocumentListItemPayload {}

export interface CountyPayload extends CountyListItemPayload {
  body: PortableTextBlock[];
  contacts?: Reference[];
  countyCode?: string[];
  locale?: string;
}

export interface CourseListItemPayload extends DocumentListItemPayload {
  lessons: string[];
}

interface CourseLessonPayload extends Omit<DocumentListItemPayload, "image"> {
  body: PortableTextBlock[];
}

export interface CoursePayload extends Omit<CourseListItemPayload, "lessons"> {
  body: PortableTextBlock[];
  lessons: CourseLessonPayload[];
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
  toc?: PortableTextBlock[];
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

export type StatisticsDataType = typeof dataSchema & { title?: string };
