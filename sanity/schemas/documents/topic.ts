import { HeartFilledIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import bodyField from "../fields/bodyField";
import contactsField from "../fields/contactsField";
import descriptionField from "../fields/descriptionField";
import imageField from "../fields/imageField";

export default defineType({
  name: "topic",
  type: "document",
  title: "Tema",
  icon: HeartFilledIcon,
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      description: "Kort tittel, helst bare ett ord",
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
    defineField({
      type: "reference",
      name: "county",
      title: "Fylke",
      to: { type: "county" },
      options: { disableNew: true },
    }),
    bodyField,
    imageField,
    contactsField,
    defineField({
      name: "active",
      title: "Aktiv",
      description: "Angir om temaet er aktivt",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      county: "county",
      media: "image",
    },
    prepare({ title, county, media }) {
      return {
        title,
        subtitle: county || "Nasjonalt",
        media,
      };
    },
  },
});
