// @ts-ignore
import { theme } from "https://themer.sanity.build/api/hues?primary=a31f34;lightest:ffffff;darkest:230109&transparent=a5bec0&positive=21c14d;400;darkest:111311&caution=ffaa00;300&critical=ff042a";

import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./schemas/schema";
import deskStructure from "./deskStructure";

export default defineConfig({
  theme,
  title: "Vofo.no",
  projectId: "qy7enua2",
  dataset: "website",
  plugins: [
    deskTool({
      structure: deskStructure,
    }),
  ],
  schema: {
    types: schemas,
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter(
          (templateItem) => templateItem.templateId != "siteSettings"
        );
      }
      return prev;
    },
    actions: (prev, { schemaType }) => {
      if (schemaType === "siteSettings") {
        return prev.filter(
          ({ action }) =>
            !["unpublish", "delete", "duplicate"].includes(action || "")
        );
      }
      return prev;
    },
  },
});
