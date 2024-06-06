import { HelpCircleIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "quiz",
  type: "object",
  title: "Quiz",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "question",
      title: "Spørsmål",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "choices",
      title: "Svaralternativer",
      type: "array",
      of: [{ type: "choice" }],
      validation: (rule) => rule.min(2),
    }),
  ],
  preview: {
    select: {
      title: "question",
      choices: "choices",
    },
    prepare({ title, choices }) {
      return {
        title,
        subtitle: `${choices?.length || "Ingen"} svaralternativer`,
      };
    },
  },
});
