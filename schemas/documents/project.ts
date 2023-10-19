import { TokenIcon } from "@sanity/icons";
import formatTime from "lib/formatTime";
import { defineArrayMember, defineField, defineType } from "sanity";
import bodyField from "schemas/fields/bodyField";
import descriptionField from "schemas/fields/descriptionField";
import imageField from "schemas/fields/imageField";
import localeField from "schemas/fields/localeField";
import titleField from "schemas/fields/titleField";

export default defineType({
  name: "project",
  type: "document",
  title: "Prosjekt",
  icon: TokenIcon,
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
    imageField,
    bodyField,
    defineField({
      type: "duration",
      name: "duration",
      title: "Varighet",
    }),
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
      type: "boolean",
      name: "active",
      title: "Aktiv",
      description: "Angir om prosjektet er aktivt",
      initialValue: true,
    }),
    localeField,
  ],
  preview: {
    select: {
      duration: "duration",
      image: "image",
      title: "title",
    },
    prepare({ duration, image, title }) {
      return {
        media: image,
        subtitle: [
          formatTime(duration?.start, "P"),
          formatTime(duration?.end, "P"),
        ]
          .filter(Boolean)
          .join(" - "),
        title,
      };
    },
  },
});
