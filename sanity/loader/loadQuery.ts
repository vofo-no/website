import { sanityFetch } from "@/sanity/lib/fetch";
import {
  allActiveCountiesQuery,
  allActiveCoursesQuery,
  allActiveSfQuery,
  allActiveTopicsQuery,
  calendarEntriesQuery,
  countyBySlugQuery,
  courseBySlugQuery,
  documentLinkByIdQuery,
  homeQuery,
  pageBySlugQuery,
  personByIdQuery,
  postBySlugQuery,
  postsByReferenceQuery,
  searchPostsQuery,
  settingsQuery,
  tagByIdQuery,
  topicBySlugQuery,
} from "@/sanity/lib/queries";
import {
  CalendarEntryPayload,
  CountyListItemPayload,
  CountyPayload,
  CourseListItemPayload,
  CoursePayload,
  DocumentLinkPayload,
  HomePayload,
  OrganizationListItemPayload,
  PagePayload,
  PersonPayload,
  PostListItemPayload,
  PostPayload,
  SettingsPayload,
  TopicListItemPayload,
  TopicPayload,
} from "@/types";

export function loadHome() {
  return sanityFetch<HomePayload>({ query: homeQuery, tags: ["home"] });
}

export function loadSettings() {
  return sanityFetch<SettingsPayload>({
    query: settingsQuery,
    tags: ["settings"],
  });
}

export function loadPost(slug: string) {
  return sanityFetch<PostPayload | null>({
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
  lastItem?: PostListItemPayload,
) {
  const paginatedSearchParams = searchParams && {
    lastPublishedAt: lastItem?.publishedAt || null,
    lastId: lastItem?._id || null,
    ...searchParams,
  };
  return sanityFetch<PostListItemPayload[]>({
    query: searchParams ? searchPostsQuery : postsByReferenceQuery,
    params: paginatedSearchParams || { ref: referencesId ?? null },
    tags: ["post", "county", "topic"],
  });
}

export function loadAllSfs() {
  return sanityFetch<OrganizationListItemPayload[]>({
    query: allActiveSfQuery,
    tags: [`organization`],
  });
}

export function loadCalendarEntries(year: string | null = null) {
  return sanityFetch<CalendarEntryPayload[]>({
    query: calendarEntriesQuery,
    params: { year },
    tags: [`event`, `post`],
  });
}

export function loadAllCounties() {
  return sanityFetch<CountyListItemPayload[]>({
    query: allActiveCountiesQuery,
    tags: [`county`],
  });
}

export function loadCounty(slug: string) {
  return sanityFetch<CountyPayload | null>({
    query: countyBySlugQuery,
    params: {
      slug,
    },
    tags: [`county:${slug}`],
  });
}

export function loadAllCourses() {
  return sanityFetch<CourseListItemPayload[]>({
    query: allActiveCoursesQuery,
    tags: [`course`],
  });
}

export function loadCourse(slug: string) {
  return sanityFetch<CoursePayload | null>({
    query: courseBySlugQuery,
    params: {
      slug,
    },
    tags: [`course:${slug}`],
  });
}

export function loadPage(slug: string) {
  return sanityFetch<PagePayload | null>({
    query: pageBySlugQuery,
    params: {
      slug,
    },
    tags: [`page:${slug}`],
  });
}

export function loadTopic(slug: string) {
  return sanityFetch<TopicPayload | null>({
    query: topicBySlugQuery,
    params: {
      slug,
    },
    tags: [`topic:${slug}`],
  });
}

export function loadAllTopics() {
  return sanityFetch<TopicListItemPayload[]>({
    query: allActiveTopicsQuery,
    tags: [`topic`],
  });
}

export function loadDocumentLink(id: string) {
  return sanityFetch<DocumentLinkPayload | null>({
    query: documentLinkByIdQuery,
    params: { id },
    tags: [`page:${id}`, `post:${id}`],
  });
}

export function loadPerson(id: string) {
  return sanityFetch<PersonPayload | null>({
    query: personByIdQuery,
    params: { id },
    tags: [`person:${id}`],
  });
}

export function loadTag(id: string) {
  return sanityFetch<DocumentLinkPayload | null>({
    query: tagByIdQuery,
    params: { id },
    tags: [`county:${id}`, `topic:${id}`],
  });
}
