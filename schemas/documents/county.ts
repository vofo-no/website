import { MdShareLocation } from "react-icons/md";
import { defineArrayMember, defineField, defineType } from "sanity";
import bodyField from "schemas/fields/bodyField";
import descriptionField from "schemas/fields/descriptionField";
import imageField from "schemas/fields/imageField";
import localeField from "schemas/fields/localeField";

export default defineType({
  name: "county",
  type: "document",
  title: "Fylke",
  icon: MdShareLocation,
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
      },
      validation: (rule) => rule.required(),
    }),
    descriptionField,
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
