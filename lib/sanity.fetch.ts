import "server-only";

import type { QueryParams } from "@sanity/client";
import { client } from "lib/sanity.client";
import {
  allActiveCountiesQuery,
  allEventsQuery,
  allProjectsQuery,
  allTopicsQuery,
  articleBySlugQuery,
  associationsPageQuery,
  countyBySlugQuery,
  documentByIdQuery,
  eventByIdQuery,
  getNewsItemsByReferenceQuery,
  getNewsItemsQuery,
  homePageQuery,
  linkableByIdQuery,
  organzationByIdQuery,
  pagesBySlugQuery,
  personByIdQuery,
  privacyQuery,
  projectBySlugQuery,
  publicationBySlugQuery,
  settingsQuery,
  taggedByIdQuery,
  topicBySlugQuery,
} from "lib/sanity.queries";
import {
  type Article,
  type AssociationsPagePayload,
  type County,
  type Event,
  type HomePagePayload,
  Linked,
  type MiniDocument,
  NewsItemType,
  type Organization,
  type PagePayload,
  type Person,
  type PrivacyPayload,
  type Project,
  type Publication,
  type SettingsPayload,
  Tagged,
  type Topic,
} from "types";

import { revalidateSecret } from "./sanity.api";

const token = process.env.SANITY_API_READ_TOKEN;

const DEFAULT_PARAMS = {} as QueryParams;
const DEFAULT_TAGS = [] as string[];

async function sanityFetch<QueryResponse>({
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

function fetchBySlug<T>(type: string, query: string, slug: string) {
  return sanityFetch<T | null>({
    query,
    params: { slug },
    tags: [`${type}:${slug}`],
  });
}

function fetchById<T>(query: string, id: string) {
  return sanityFetch<T | null>({
    query,
    params: { id },
    tags: [id],
  });
}

function fetchList<T>(type: string, query: string, params?: QueryParams) {
  return sanityFetch<T[]>({
    query,
    params,
    tags: [type],
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
  return fetchBySlug<PagePayload>("page", pagesBySlugQuery, slug);
}

export function getNewsItems(type: "article" | "publication") {
  return fetchList<NewsItemType>(type, getNewsItemsQuery, { type });
}

export function getNewsItemsByReference(
  type: "article" | "publication",
  ref: string
) {
  return fetchList<NewsItemType>(type, getNewsItemsByReferenceQuery, {
    type,
    ref,
  });
}

export function getPublicationBySlug(slug: string) {
  return fetchBySlug<Publication>("publication", publicationBySlugQuery, slug);
}

export function getArticleBySlug(slug: string) {
  return fetchBySlug<Article>("article", articleBySlugQuery, slug);
}

export function getEventById(id: string) {
  return fetchById<Event>(eventByIdQuery, id);
}

export function getLinkedById(id: string) {
  return fetchById<Linked>(linkableByIdQuery, id);
}

export function getPersonById(id: string) {
  return fetchById<Person>(personByIdQuery, id);
}

export function getOrganizationById(id: string) {
  return fetchById<Organization>(organzationByIdQuery, id);
}

export function getDocumentById(id: string) {
  return fetchById<MiniDocument>(documentByIdQuery, id);
}

export function getTaggedById(id: string) {
  return fetchById<Tagged>(taggedByIdQuery, id);
}

export function getAllActiveCounties() {
  return fetchList<County>("county", allActiveCountiesQuery);
}

export function getCountyBySlug(slug: string) {
  return fetchBySlug<County>("county", countyBySlugQuery, slug);
}

export function getAllEvents() {
  return fetchList<Event>("event", allEventsQuery);
}

export function getAllTopics() {
  return fetchList<Topic>("topic", allTopicsQuery);
}

export function getTopicBySlug(slug: string) {
  return fetchBySlug<Topic>("topic", topicBySlugQuery, slug);
}

export function getAllProjects() {
  return fetchList<Project>("project", allProjectsQuery);
}

export function getProjectBySlug(slug: string) {
  return fetchBySlug<Project>("project", projectBySlugQuery, slug);
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
