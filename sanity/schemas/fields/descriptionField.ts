import { defineField } from "sanity";

export default defineField({
  name: "description",
  description: "En kort beskrivelse",
  title: "Beskrivelse",
  type: "text",
  validation: (rule) => rule.max(300),
  rows: 3,
});
