import "server-only";

import { draftMode } from "next/headers";
import { client } from "@/sanity/lib/client";
import {
  allActiveCountiesQuery,
  allActiveTopicsQuery,
  countyBySlugQuery,
  pageBySlugQuery,
  postBySlugQuery,
  settingsQuery,
  topicBySlugQuery,
} from "@/sanity/lib/queries";
import { token } from "@/sanity/lib/token";
import {
  CountyListItemPayload,
  CountyPayload,
  PagePayload,
  PostPayload,
  SettingsPayload,
  TopicListItemPayload,
  TopicPayload,
} from "@/types";
import * as queryStore from "@sanity/react-loader";

const serverClient = client.withConfig({
  token,
  stega: {
    enabled: process.env.VERCEL_ENV === "preview",
  },
});

queryStore.setServerClient(serverClient);

const usingCdn = serverClient.config().useCdn;

export const loadQuery = ((query, params = {}, options = {}) => {
  const {
    perspective = draftMode().isEnabled ? "previewDrafts" : "published",
  } = options;
  let revalidate: NextFetchRequestConfig["revalidate"] = 0;
  if (!usingCdn && Array.isArray(options.next?.tags)) {
    revalidate = false;
  } else if (usingCdn) {
    revalidate = 60;
  }
  return queryStore.loadQuery(query, params, {
    ...options,
    next: {
      revalidate,
      ...(options.next || {}),
    },
    perspective,
    stega: { enabled: draftMode().isEnabled },
  });
}) satisfies typeof queryStore.loadQuery;

/**
 * Loaders that are used in more than one place are declared here, otherwise they're colocated with the component
 */

export function loadSettings() {
  return loadQuery<SettingsPayload>(
    settingsQuery,
    {},
    { next: { tags: ["settings"] } },
  );
}

export function loadPost(slug: string) {
  return loadQuery<PostPayload>(
    postBySlugQuery,
    {
      slug,
    },
    { next: { tags: [`post:${slug}`] } },
  );
}

export function loadAllCounties() {
  return loadQuery<CountyListItemPayload[]>(
    allActiveCountiesQuery,
    {},
    { next: { tags: [`county`] } },
  );
}

export function loadCounty(slug: string) {
  return loadQuery<CountyPayload>(
    countyBySlugQuery,
    {
      slug,
    },
    { next: { tags: [`county:${slug}`] } },
  );
}

export function loadPage(slug: string) {
  return loadQuery<PagePayload>(
    pageBySlugQuery,
    {
      slug,
    },
    { next: { tags: [`page:${slug}`] } },
  );
}

export function loadTopic(slug: string) {
  return loadQuery<TopicPayload>(
    topicBySlugQuery,
    {
      slug,
    },
    { next: { tags: [`topic:${slug}`] } },
  );
}

export function loadAllTopics() {
  return loadQuery<TopicListItemPayload[]>(
    allActiveTopicsQuery,
    {},
    { next: { tags: [`topic`] } },
  );
}
