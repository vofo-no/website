import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import descriptionField from "../fields/descriptionField";
import emailField from "../fields/emailField";
import imageField from "../fields/imageField";
import phoneField from "../fields/phoneField";

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
      name: "position",
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
    select: { title: "name", subtitle: "position", media: "image" },
  },
});
