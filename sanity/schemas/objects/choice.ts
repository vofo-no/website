import { defineField, defineType } from "sanity";

export default defineType({
  name: "choice",
  type: "object",
  title: "Alternativ",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "isCorrect", title: "Riktig svar", type: "boolean" }),
  ],
  preview: {
    select: {
      title: "title",
      isCorrect: "isCorrect",
    },
    prepare({ title, isCorrect }) {
      return {
        title: `${isCorrect ? "✅" : "❌"} ${title}`,
      };
    },
  },
});
