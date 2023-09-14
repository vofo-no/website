import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import bodyField from "schemas/fields/bodyField";
import descriptionField from "schemas/fields/descriptionField";
import titleField from "schemas/fields/titleField";

export default defineType({
  type: "document",
  name: "page",
  title: "Side",
  icon: DocumentIcon,
  fields: [
    titleField,
    defineField({
      type: "slug",
      name: "slug",
      title: "Slug",
      options: {
        source: "title",
      },
      validation: (rule) => rule.required(),
    }),
    descriptionField,
    bodyField,
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug",
    },
    prepare({ title, slug }) {
      return {
        subtitle: `Side: ${slug.current}`,
        title,
      };
    },
  },
});
