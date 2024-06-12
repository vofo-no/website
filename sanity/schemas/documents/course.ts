import { BookIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import bodyField from "../fields/bodyField";
import descriptionField from "../fields/descriptionField";
import imageField from "../fields/imageField";

export default defineType({
  name: "course",
  type: "document",
  title: "Kurs",
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
    {
      ...bodyField,
      title: "Introduksjon",
    },
    defineField({
      name: "lessons",
      title: "Leksjoner",
      type: "array",
      of: [{ type: "lesson" }],
      validation: (rule) => rule.min(1),
    }),
    imageField,
    defineField({
      name: "active",
      title: "Aktiv",
      description: "Angir om kurset er aktivt",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "sortOrder",
      title: "Sorteringsrekkefølge",
      description: "Kursene sorteres etter dette tallet",
      type: "number",
      initialValue: 10,
    }),
  ],
  preview: {
    select: {
      title: "title",
      lessons: "lessons",
      media: "image",
    },
    prepare({ title, lessons, media }) {
      return {
        title,
        subtitle: `${lessons?.length || "Ingen"} leksjoner`,
        media,
      };
    },
  },
});
