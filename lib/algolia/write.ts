import { urlForImage } from "@/sanity/lib/image";
import { Image } from "@/types";
import algoliasearch from "algoliasearch";

import { appId, indexName, writeToken } from "./api";

const client = algoliasearch(appId, writeToken);
const index = client.initIndex(indexName);

export interface WebhookIndexableDocument {
  _id: string;
  deleted?: boolean;
  _type: string;
  title?: string;
  slug?: string;
  description?: string;
  body?: string;
  image?: Image;
  active?: boolean;
}

function prepareWebhookForIndex(record: WebhookIndexableDocument) {
  const { _id, deleted, active, _type, title, slug, description, body, image } =
    record;

  // Deleted document
  if (deleted) return undefined;

  // Explicit inactive document
  if (typeof active === "boolean" && !active) return undefined;

  // Missing required fields
  if (!title || !slug) return undefined;

  return prepareForIndex({
    objectID: _id,
    _type,
    title,
    slug,
    description,
    body,
    image,
  });
}

export function updateRecordFromWebhook(record: WebhookIndexableDocument) {
  if (!["post", "county", "topic", "page"].includes(record._type)) return;

  const next = prepareWebhookForIndex(record);

  if (!next) {
    index.deleteObject(record._id);
  } else {
    index.saveObject(next);
  }
}

export interface IndexableDocument {
  objectID: string;
  _type: string;
  title: string;
  slug: string;
  description?: string;
  body?: string;
  image?: Image;
}

function prepareForIndex(record: IndexableDocument) {
  const { image, body, ...rest } = record;

  if (image && urlForImage(image)) {
    return {
      image: urlForImage(image).size(750, 500).url(),
      img_alt: image.alt,
      body: body ? body.substring(0, 9000) : undefined,
      ...rest,
    };
  }

  return { body: body ? body.substring(0, 9000) : undefined, ...rest };
}

export function replaceAllObjects(objects: IndexableDocument[]) {
  return index.replaceAllObjects(objects.map(prepareForIndex), { safe: true });
}
