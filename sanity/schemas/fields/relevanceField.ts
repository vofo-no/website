import { defineArrayMember, defineField } from "sanity";

export default defineField({
  name: "relevance",
  type: "array",
  title: "Relevans",
  description: "Knytt dokumentet til et tema, fylke og/eller prosjekt.",
  validation: (rule) => rule.unique(),
  of: [
    defineArrayMember({
      type: "reference",
      to: [{ type: "county" }, { type: "topic" }, { type: "project" }],
      options: { disableNew: true },
    }),
  ],
});
