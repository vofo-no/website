import "server-only";

import type { QueryParams } from "@sanity/client";
import { client } from "lib/sanity.client";
import {
  allActiveCountiesQuery,
  associationsPageQuery,
  documentByIdQuery,
  homePageQuery,
  homePageTitleQuery,
  pagePaths,
  pagesBySlugQuery,
  personByIdQuery,
  privacyQuery,
  publicationBySlugQuery,
  settingsQuery,
} from "lib/sanity.queries";
import type {
  AssociationsPagePayload,
  CountiesPayload,
  DocumentPayload,
  HomePagePayload,
  PagePayload,
  PersonPayload,
  PrivacyPayload,
  PublicationPayload,
  //ProjectPayload,
  SettingsPayload,
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

export function getPublicationBySlug(slug: string) {
  return sanityFetch<PublicationPayload | null>({
    query: publicationBySlugQuery,
    params: { slug },
    tags: [`publication:${slug}`],
  });
}

export function getPersonById(id: string) {
  return sanityFetch<PersonPayload | null>({
    query: personByIdQuery,
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

/*export function getProjectBySlug(slug: string) {
  return sanityFetch<ProjectPayload | null>({
    query: projectBySlugQuery,
    params: { slug },
    tags: [`project:${slug}`],
  });
}
*/
export function getHomePage() {
  return sanityFetch<HomePagePayload | null>({
    query: homePageQuery,
    tags: ["home", "project"],
  });
}

export function getAssociationsPage() {
  return sanityFetch<AssociationsPagePayload | null>({
    query: associationsPageQuery,
    tags: ["learningAssociations", "organization"],
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
