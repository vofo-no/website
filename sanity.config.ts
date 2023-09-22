import { visionTool } from "@sanity/vision";
import {
  apiVersion,
  dataset,
  previewSecretId,
  projectId,
} from "lib/sanity.api";
import { pageStructure, singletonPlugin } from "plugins/settings";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import Iframe, {
  defineUrlResolver,
  IframeOptions,
} from "sanity-plugin-iframe-pane";
import { previewUrl } from "sanity-plugin-iframe-pane/preview-url";
import article from "schemas/documents/article";
import county from "schemas/documents/county";
import event from "schemas/documents/event";
import organization from "schemas/documents/organization";
import page from "schemas/documents/page";
import person from "schemas/documents/person";
import publication from "schemas/documents/publication";
import topic from "schemas/documents/topic";
import banner from "schemas/objects/banner";
import duration from "schemas/objects/duration";
import milestone from "schemas/objects/milestone";
import people from "schemas/objects/people";
import someLink from "schemas/objects/someLink";
import timeline from "schemas/objects/timeline";
import home from "schemas/singletons/home";
import learningAssociations from "schemas/singletons/learningAssociations";
import settings from "schemas/singletons/settings";

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || "Vofo";

export const PREVIEWABLE_DOCUMENT_TYPES = [
  home.name,
  learningAssociations.name,
  page.name,
] satisfies string[];

export const PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS = [
  page.name,
] satisfies typeof PREVIEWABLE_DOCUMENT_TYPES;

// Used to generate URLs for drafts and live previews
export const PREVIEW_BASE_URL = "/api/draft";

export const urlResolver = defineUrlResolver({
  base: PREVIEW_BASE_URL,
  requiresSlug: PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS,
});

export const iframeOptions = {
  url: urlResolver,
  urlSecretId: previewSecretId,
} satisfies IframeOptions;

export default defineConfig({
  basePath: "/studio",
  projectId: projectId || "",
  dataset: dataset || "",
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      home,
      learningAssociations,
      settings,
      // Documents
      article,
      publication,
      county,
      event,
      organization,
      person,
      topic,
      page,
      // Objects
      banner,
      duration,
      milestone,
      people,
      someLink,
      timeline,
    ],
  },
  plugins: [
    deskTool({
      structure: pageStructure([home, learningAssociations, settings]),
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      // You can add any React component to `S.view.component` and it will be rendered in the pane
      // and have access to content in the form in real-time.
      // It's part of the Studio's “Structure Builder API” and is documented here:
      // https://www.sanity.io/docs/structure-builder-reference
      defaultDocumentNode: (S, { schemaType }) => {
        if ((PREVIEWABLE_DOCUMENT_TYPES as string[]).includes(schemaType)) {
          return S.document().views([
            // Default form view
            S.view.form(),
            // Preview
            S.view.component(Iframe).options(iframeOptions).title("Preview"),
          ]);
        }

        return null;
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([home.name, settings.name]),
    // Add the "Open preview" action
    previewUrl({
      base: PREVIEW_BASE_URL,
      requiresSlug: PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS,
      urlSecretId: previewSecretId,
      matchTypes: PREVIEWABLE_DOCUMENT_TYPES,
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
