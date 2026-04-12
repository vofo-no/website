import { sanityFetch } from "@/sanity/lib/fetch";
import {
  allActiveCountiesQuery,
  allActiveCoursesQuery,
  allActiveSfQuery,
  allActiveTopicsQuery,
  calendarEntriesQuery,
  calendarEntryByIdQuery,
  countyBySlugQuery,
  courseBySlugQuery,
  documentLinkByIdQuery,
  homeQuery,
  pageBySlugQuery,
  personByIdQuery,
  postBySlugQuery,
  postsByReferenceQuery,
  sdgByIdQuery,
  searchPostsQuery,
  settingsQuery,
  tagByIdQuery,
  topicBySlugQuery,
} from "@/sanity/lib/queries";

export async function loadHome() {
  return sanityFetch({ query: homeQuery, tags: ["home"] });
}

export async function loadSettings() {
  return sanityFetch({
    query: settingsQuery,
    tags: ["settings"],
  });
}

export function loadPost(slug: string) {
  return sanityFetch({
    query: postBySlugQuery,
    params: {
      slug,
    },
    tags: [`post:${slug}`],
  });
}

export function loadPostList(
  referencesId?: string,
  searchParams?: {
    docTypes: string[] | null;
    q: string | null;
    refs: string[] | null;
    years: string[] | null;
  },
  lastItem?: { publishedAt?: string | null; _id: string | null } | null,
) {
  const paginatedSearchParams = searchParams && {
    lastPublishedAt: lastItem?.publishedAt || null,
    lastId: lastItem?._id || null,
    ...searchParams,
  };
  return sanityFetch({
    query: searchParams ? searchPostsQuery : postsByReferenceQuery,
    params: paginatedSearchParams || { ref: referencesId ?? null },
    tags: ["post", "county", "topic"],
  });
}

export function loadAllSfs() {
  return sanityFetch({
    query: allActiveSfQuery,
    tags: [`organization`],
  });
}

export function loadCalendarEntryById(id: string) {
  return sanityFetch({
    query: calendarEntryByIdQuery,
    params: { id },
    tags: [`event:${id}`],
  });
}

export function loadCalendarEntries(year: string | null = null) {
  return sanityFetch({
    query: calendarEntriesQuery,
    params: { year },
    tags: [`event`, `post`],
  });
}

export function loadAllCounties() {
  return sanityFetch({
    query: allActiveCountiesQuery,
    tags: [`county`],
  });
}

export function loadCounty(slug: string) {
  return sanityFetch({
    query: countyBySlugQuery,
    params: {
      slug,
    },
    tags: [`county:${slug}`],
  });
}

export function loadAllCourses() {
  return sanityFetch({
    query: allActiveCoursesQuery,
    tags: [`course`],
  });
}

export function loadCourse(slug: string) {
  return sanityFetch({
    query: courseBySlugQuery,
    params: {
      slug,
    },
    tags: [`course:${slug}`],
  });
}

export function loadPage(slug: string) {
  return sanityFetch({
    query: pageBySlugQuery,
    params: {
      slug,
    },
    tags: [`page:${slug}`],
  });
}

export function loadTopic(slug: string) {
  return sanityFetch({
    query: topicBySlugQuery,
    params: {
      slug,
    },
    tags: [`topic:${slug}`],
  });
}

export function loadAllTopics() {
  return sanityFetch({
    query: allActiveTopicsQuery,
    tags: [`topic`],
  });
}

export function loadDocumentLink(id: string) {
  return sanityFetch({
    query: documentLinkByIdQuery,
    params: { id },
    tags: [`page:${id}`, `post:${id}`],
  });
}

export function loadPerson(id: string) {
  return sanityFetch({
    query: personByIdQuery,
    params: { id },
    tags: [`person:${id}`],
  });
}

export function loadSdg(id: string) {
  return sanityFetch({
    query: sdgByIdQuery,
    params: { id },
    tags: [`sdg:${id}`],
  });
}

export function loadTag(id: string) {
  return sanityFetch({
    query: tagByIdQuery,
    params: { id },
    tags: [`county:${id}`, `topic:${id}`],
  });
}
