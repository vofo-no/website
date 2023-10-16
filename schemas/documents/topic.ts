import { HeartFilledIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import bodyField from "schemas/fields/bodyField";
import descriptionField from "schemas/fields/descriptionField";
import imageField from "schemas/fields/imageField";

export default defineType({
  name: "topic",
  type: "document",
  title: "Sak",
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
    defineField({
      name: "contacts",
      title: "Kontaktpersoner",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: { type: "person" },
          options: { disableNew: true },
        }),
      ],
    }),
    defineField({
      name: "active",
      title: "Aktiv",
      description: "Angir om saken er aktiv",
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
