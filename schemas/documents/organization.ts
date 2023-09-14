import { SchemaIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import bodyField from "schemas/fields/bodyField";
import descriptionField from "schemas/fields/descriptionField";
import emailField from "schemas/fields/emailField";
import imageField from "schemas/fields/imageField";
import phoneField from "schemas/fields/phoneField";
import urlField from "schemas/fields/urlField";

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
