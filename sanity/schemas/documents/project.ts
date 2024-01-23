import { TokenIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { formatDate } from "@/lib/date";

import bodyField from "../fields/bodyField";
import contactsField from "../fields/contactsField";
import descriptionField from "../fields/descriptionField";
import imageField from "../fields/imageField";
import localeField from "../fields/localeField";
import titleField from "../fields/titleField";

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
    contactsField,
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
        subtitle: formatDate({ date: duration?.start, endDate: duration?.end }),
        title,
      };
    },
  },
});
