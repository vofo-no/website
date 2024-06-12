"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...index]]\page.tsx` route
 */
import { assist } from "@sanity/assist";
import { nbNOLocale } from "@sanity/locale-nb-no";
import { visionTool } from "@sanity/vision";
import { createAuthStore, defineConfig } from "sanity";
import { media } from "sanity-plugin-media";
import { defineDocuments, presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/lib/api";
import { locate } from "./sanity/plugins/locate";
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
    structureTool({ structure: pageStructure([home, settings]) }),
    visionTool({ defaultApiVersion: apiVersion }),
    presentationTool({
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: "/aktuelt/:slug",
            filter: `_type == "post" && slug.current == $slug`,
          },
          {
            route: "/tema/:slug",
            filter: `_type == "topic" && slug.current == $slug`,
          },
          {
            route: "/fylker/:slug",
            filter: `_type == "county" && slug.current == $slug`,
          },
          {
            route: "/opplaring/:slug",
            filter: `_type == "course" && slug.current == $slug`,
          },
          {
            route: "/:slug",
            filter: `_type == "page" && slug.current == $slug`,
          },
        ]),
        locations: locate,
      },
      previewUrl: {
        draftMode: {
          enable: "/api/draft",
        },
      },
    }),
    media(),
    nbNOLocale(),
    assist(),
  ],
  auth: createAuthStore({
    projectId,
    dataset,
    redirectOnSingle: true,
    mode: "replace",
    providers: [
      {
        name: "saml",
        title: "Vofo SSO",
        url: "https://api.sanity.io/v2021-10-01/auth/saml/login/5bde7648",
      },
    ],
    loginMethod: "dual",
  }),
});
