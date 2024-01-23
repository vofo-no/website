/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...index]]\page.tsx` route
 */

import { nbNOLocale } from "@sanity/locale-nb-no";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { presentationTool } from "sanity/presentation";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/lib/api";
import { pageStructure } from "./sanity/plugins/settings";
import { schema } from "./sanity/schema";
import home from "./sanity/schemas/documents/home";
import settings from "./sanity/schemas/documents/settings";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
    deskTool({
      title: "Struktur",
      structure: pageStructure([home, settings]),
    }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: "/api/draft",
        },
      },
    }),
    nbNOLocale(),
  ],
});
