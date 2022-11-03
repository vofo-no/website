import { Rule } from "@sanity/types";

export default {
  name: "relevance",
  type: "array",
  group: "content",
  title: "Relevans",
  description:
    "Knytt dette dokumentet til tema, region og/eller studieforbund.",
  validation: (Rule: Rule) => Rule.unique(),
  of: [
    {
      type: "reference",
      to: [
        { type: "learningAssociation" },
        { type: "region" },
        { type: "topic" },
      ],
      options: { disableNew: true },
    },
  ],
};
