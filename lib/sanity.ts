import {
  createPreviewSubscriptionHook,
  createCurrentUserHook,
} from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import { config } from "./config";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const urlFor = (source: SanityImageSource) =>
  createImageUrlBuilder(config).image(source);

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export const useCurrentUser = createCurrentUserHook(config);
