import "server-only";

import { draftMode } from "next/headers";
import { client } from "@/sanity/lib/client";
import { settingsQuery } from "@/sanity/lib/queries";
import { token } from "@/sanity/lib/token";
import { SettingsPayload } from "@/types";
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
