import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import bodyField from "../fields/bodyField";
import contactsField from "../fields/contactsField";
import descriptionField from "../fields/descriptionField";
import titleField from "../fields/titleField";

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
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    descriptionField,
    bodyField,
    contactsField,
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
