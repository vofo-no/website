import { MapPinnedIcon } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

import bodyField from "../fields/bodyField";
import contactsField from "../fields/contactsField";
import descriptionField from "../fields/descriptionField";
import imageField from "../fields/imageField";
import localeField from "../fields/localeField";

export default defineType({
  name: "county",
  type: "document",
  title: "Fylke",
  icon: MapPinnedIcon,
  fields: [
    defineField({
      name: "name",
      title: "Navn",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: "slug",
      name: "slug",
      title: "Slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    descriptionField,
    bodyField,
    imageField,
    contactsField,
    defineField({
      name: "active",
      title: "Aktiv",
      description: "Angir om fylket er aktivt",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "countyCode",
      title: "Fylkesnummer",
      description: "Kode som identifiserer fylket i offentlig statistikk",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.unique(),
      options: {
        layout: "tags",
        sortable: false,
      },
    }),
    localeField,
  ],
});
