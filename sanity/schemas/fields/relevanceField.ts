import { defineArrayMember, defineField } from "sanity";

export default defineField({
  name: "relevance",
  type: "array",
  title: "Relevans",
  description: "Knytt dokumentet til et tema og/eller fylke.",
  validation: (rule) => rule.unique(),
  of: [
    defineArrayMember({
      type: "reference",
      to: [{ type: "county" }, { type: "topic" }],
      options: { disableNew: true },
    }),
  ],
});
