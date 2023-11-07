import "server-only";

import type { QueryParams } from "@sanity/client";
import { client } from "lib/sanity.client";
import {
  allActiveCountiesQuery,
  allEventsQuery,
  allProjectsQuery,
  allTopicsQuery,
  associationsPageQuery,
  countyBySlugQuery,
  documentByIdQuery,
  eventByIdQuery,
  homePageQuery,
  linkableByIdQuery,
  listPublicationsByDocTypesAndReferenceQuery,
  organzationByIdQuery,
  pagesBySlugQuery,
  personByIdQuery,
  privacyQuery,
  projectBySlugQuery,
  publicationBySlugQuery,
  searchPublicationsQuery,
  settingsQuery,
  taggedByIdQuery,
  topicBySlugQuery,
} from "lib/sanity.queries";
import {
  type AssociationsPagePayload,
  type County,
  type Event,
  type HomePagePayload,
  Linked,
  type MiniDocument,
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

import { documentPostTypeValues, newsPostTypeValues } from "./postTypes";
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

export function searchPublications(
  searchParams: {
    [key: string]: string | string[] | undefined;
  } = {}
) {
  const params: {
    counties: string[] | null;
    docTypes: string[] | null;
    q: string | null;
    topics: string[] | null;
    years: string[] | null;
  } = {
    counties: null,
    docTypes: null,
    q: null,
    topics: null,
    years: null,
  };

  // TYPE
  params.docTypes =
    (typeof searchParams.type === "string"
      ? [searchParams.type]
      : searchParams.type) || null;

  // TID
  if (typeof searchParams.tid === "string")
    searchParams.tid = [searchParams.tid];

  params.years = searchParams.tid || null;

  // TOPICS
  params.topics =
    (typeof searchParams.topics === "string"
      ? [searchParams.topics]
      : searchParams.topics) || null;

  // COUNTIES
  params.counties =
    (typeof searchParams.counties === "string"
      ? [searchParams.counties]
      : searchParams.counties) || null;

  // Q
  params.q =
    typeof searchParams.q === "string"
      ? searchParams.q
      : searchParams.q?.[0] || null;

  return fetchList<Publication>("publication", searchPublicationsQuery, params);
}

export function getPublicationsByDocTypeAndReference(
  type: "article" | "publication",
  ref: string | null = null
) {
  const docTypes =
    type === "article" ? newsPostTypeValues : documentPostTypeValues;
  return fetchList<Publication>(
    "publication",
    listPublicationsByDocTypesAndReferenceQuery,
    { docTypes, ref }
  );
}

export function getPublicationBySlug(slug: string) {
  return fetchBySlug<Publication>("publication", publicationBySlugQuery, slug);
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
