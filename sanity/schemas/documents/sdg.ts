import { ColorWheelIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import descriptionField from "../fields/descriptionField";
import urlField from "../fields/urlField";

export default defineType({
  name: "sdg",
  title: "Bærekraftsmål",
  type: "document",
  icon: ColorWheelIcon,
  fields: [
    defineField({
      name: "number",
      title: "Nummer",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Navn",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "symbol",
      title: "Symbol",
      type: "image",
      validation: (rule) => rule.required(),
      options: {
        hotspot: false,
        accept: "image/svg+xml",
      },
    }),
    descriptionField,
    urlField,
  ],
  preview: {
    select: { title: "name", number: "number", media: "symbol" },
    prepare: ({ title, number, media }) => ({
      title,
      subtitle: `Mål ${number || "uten nummer"}`,
      media,
    }),
  },
});
