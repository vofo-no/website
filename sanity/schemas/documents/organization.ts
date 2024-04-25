import { SchemaIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import bodyField from "../fields/bodyField";
import descriptionField from "../fields/descriptionField";
import emailField from "../fields/emailField";
import imageField from "../fields/imageField";
import phoneField from "../fields/phoneField";
import urlField from "../fields/urlField";

export default defineType({
  name: "organization",
  type: "document",
  title: "Organisasjon",
  icon: SchemaIcon,
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
    }),
    descriptionField,
    defineField({
      name: "logo",
      type: "image",
      title: "Logo",
      options: {
        hotspot: true,
      },
    }),
    emailField,
    phoneField,
    urlField,
    imageField,
    bodyField,
    {
      name: "active",
      title: "Aktiv",
      description: "Angir om organisasjonen er aktiv",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "ssbCode",
      title: "SSB-kode",
      description:
        "For studieforbund: Kode som identifiserer studieforbundet i offentlig statistikk (25XX)",
      type: "string",
    },
  ],
});
