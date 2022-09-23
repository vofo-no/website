import { Rule } from "@sanity/types";

export default {
  name: "person",
  title: "Person",
  type: "object",
  fields: [
    {
      name: "name",
      title: "Navn",
      type: "string",
      description: "Fornavn og etternavn",
    },
    {
      name: "email",
      title: "E-postadresse",
      type: "string",
      validation: (Rule: Rule) => Rule.regex(/^\S+@\S+\.\S+$/),
    },
    {
      name: "phone",
      title: "Telefon",
      type: "string",
      validation: (Rule: Rule) => Rule.regex(/^\d+$/),
    },
    {
      name: "image",
      title: "Bilde",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
};
