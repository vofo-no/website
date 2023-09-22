import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import descriptionField from "schemas/fields/descriptionField";
import emailField from "schemas/fields/emailField";
import imageField from "schemas/fields/imageField";
import phoneField from "schemas/fields/phoneField";

export default defineType({
  name: "person",
  title: "Person",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Navn",
      type: "string",
      description: "Fornavn og etternavn",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Stillingstittel",
      type: "string",
    }),
    defineField({
      name: "organization",
      title: "Ev. organisasjon/avdeling",
      type: "string",
    }),
    emailField,
    phoneField,
    imageField,
    descriptionField,
  ],
  preview: {
    select: { title: "name", subtitle: "title", media: "image" },
  },
});
