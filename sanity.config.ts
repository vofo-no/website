import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "lib/sanity.api";
import { pageStructure, singletonPlugin } from "plugins/settings";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { media } from "sanity-plugin-media";
import article from "schemas/documents/article";
import county from "schemas/documents/county";
import event from "schemas/documents/event";
import organization from "schemas/documents/organization";
import page from "schemas/documents/page";
import person from "schemas/documents/person";
import project from "schemas/documents/project";
import publication from "schemas/documents/publication";
import topic from "schemas/documents/topic";
import banner from "schemas/objects/banner";
import documentLink from "schemas/objects/documentLink";
import duration from "schemas/objects/duration";
import milestone from "schemas/objects/milestone";
import organizations from "schemas/objects/organizations";
import people from "schemas/objects/people";
import someLink from "schemas/objects/someLink";
import timeline from "schemas/objects/timeline";
import home from "schemas/singletons/home";
import learningAssociations from "schemas/singletons/learningAssociations";
import settings from "schemas/singletons/settings";

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || "Vofo";

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
      project,
      topic,
      page,
      // Objects
      banner,
      documentLink,
      duration,
      milestone,
      organizations,
      people,
      someLink,
      timeline,
    ],
  },
  plugins: [
    deskTool({
      structure: pageStructure({
        singletonTypeDefs: [home, learningAssociations, settings],
        hiddenTypes: ["media.tag"],
      }),
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin({ types: [home.name, settings.name] }),
    media(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
