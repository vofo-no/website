import { BookIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import bodyField from "../fields/bodyField";
import descriptionField from "../fields/descriptionField";

export default defineType({
  name: "lesson",
  type: "object",
  title: "Leksjon",
  icon: BookIcon,
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      description: "Kort tittel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
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
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle,
      };
    },
  },
});
