import { defineField, defineType } from "sanity";

export default defineType({
  name: "someLink",
  title: "SoMe-lenke",
  type: "object",
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Tittel",
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: "url",
      name: "url",
      title: "Lenke",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "url",
    },
    prepare({ title, description }) {
      return {
        title,
        subtitle: description,
      };
    },
  },
});
