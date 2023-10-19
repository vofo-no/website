import "server-only";

import type { QueryParams } from "@sanity/client";
import { client } from "lib/sanity.client";
import {
  allActiveCountiesQuery,
  allProjectsQuery,
  allTopicsQuery,
  articleBySlugQuery,
  associationsPageQuery,
  countyBySlugQuery,
  documentByIdQuery,
  getNewsItemsByReferenceQuery,
  getNewsItemsQuery,
  homePageQuery,
  homePageTitleQuery,
  organzationByIdQuery,
  pagePaths,
  pagesBySlugQuery,
  personByIdQuery,
  privacyQuery,
  projectBySlugQuery,
  publicationBySlugQuery,
  settingsQuery,
  topicBySlugQuery,
} from "lib/sanity.queries";
import type {
  ArticlePayload,
  AssociationsPagePayload,
  CountiesPayload,
  County,
  DocumentPayload,
  HomePagePayload,
  Organization,
  PagePayload,
  PersonPayload,
  PrivacyPayload,
  Project,
  PublicationPayload,
  //ProjectPayload,
  SettingsPayload,
  Topic,
} from "types";

import { revalidateSecret } from "./sanity.api";

export const token = process.env.SANITY_API_READ_TOKEN;

const DEFAULT_PARAMS = {} as QueryParams;
const DEFAULT_TAGS = [] as string[];

export async function sanityFetch<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  tags = DEFAULT_TAGS,
}: {
  query: string;
  params?: QueryParams;
  tags: string[];
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, params, {
    // We only cache if there's a revalidation webhook setup
    cache: revalidateSecret ? "force-cache" : "no-store",
    next: {
      tags,
    },
  });
}

export function getSettings() {
  return sanityFetch<SettingsPayload>({
    query: settingsQuery,
    tags: ["settings", "home", "page", "project"],
  });
}

export function getPrivacy() {
  return sanityFetch<PrivacyPayload>({
    query: privacyQuery,
    tags: ["settings"],
  });
}

export function getPageBySlug(slug: string) {
  return sanityFetch<PagePayload | null>({
    query: pagesBySlugQuery,
    params: { slug },
    tags: [`page:${slug}`],
  });
}

export function getNewsItems(type: "article" | "publication") {
  return sanityFetch<Array<PublicationPayload | ArticlePayload> | null>({
    query: getNewsItemsQuery,
    params: { type },
    tags: [type],
  });
}

export function getNewsItemsByReference(
  type: "article" | "publication",
  ref: string
) {
  return sanityFetch<Array<PublicationPayload | ArticlePayload> | null>({
    query: getNewsItemsByReferenceQuery,
    params: { type, ref },
    tags: [type],
  });
}
export function getPublicationBySlug(slug: string) {
  return sanityFetch<PublicationPayload | null>({
    query: publicationBySlugQuery,
    params: { slug },
    tags: [`publication:${slug}`],
  });
}

export function getArticleBySlug(slug: string) {
  return sanityFetch<ArticlePayload | null>({
    query: articleBySlugQuery,
    params: { slug },
    tags: [`article:${slug}`],
  });
}

export function getPersonById(id: string) {
  return sanityFetch<PersonPayload | null>({
    query: personByIdQuery,
    params: { id },
    tags: [id],
  });
}

export function getOrganizationById(id: string) {
  return sanityFetch<Organization | null>({
    query: organzationByIdQuery,
    params: { id },
    tags: [id],
  });
}

export function getDocumentById(id: string) {
  return sanityFetch<DocumentPayload | null>({
    query: documentByIdQuery,
    params: { id },
    tags: [id],
  });
}

export function getAllActiveCounties() {
  return sanityFetch<CountiesPayload>({
    query: allActiveCountiesQuery,
    tags: ["county"],
  });
}

export function getCountyBySlug(slug: string) {
  return sanityFetch<County>({
    query: countyBySlugQuery,
    params: { slug },
    tags: [`county:${slug}`],
  });
}

export function getAllTopics() {
  return sanityFetch<Topic[]>({
    query: allTopicsQuery,
    tags: ["topic"],
  });
}

export function getTopicBySlug(slug: string) {
  return sanityFetch<Topic | null>({
    query: topicBySlugQuery,
    params: { slug },
    tags: [`topic:${slug}`],
  });
}

export function getAllProjects() {
  return sanityFetch<Project[]>({
    query: allProjectsQuery,
    tags: ["project"],
  });
}

export function getProjectBySlug(slug: string) {
  return sanityFetch<Project | null>({
    query: projectBySlugQuery,
    params: { slug },
    tags: [`project:${slug}`],
  });
}

export function getHomePage() {
  return sanityFetch<HomePagePayload | null>({
    query: homePageQuery,
    tags: ["home"],
  });
}

export function getAssociationsPage() {
  return sanityFetch<AssociationsPagePayload | null>({
    query: associationsPageQuery,
    tags: ["learningAssociation", "organization"],
  });
}

export function getHomePageTitle() {
  return sanityFetch<string | null>({
    query: homePageTitleQuery,
    tags: ["home"],
  });
}

export function getPagesPaths() {
  return client.fetch<string[]>(
    pagePaths,
    {},
    { token, perspective: "published" }
  );
}
/*export function getProjectsPaths() {
  return client.fetch<string[]>(
    projectPaths,
    {},
    { token, perspective: "published" }
  );
}
*/
