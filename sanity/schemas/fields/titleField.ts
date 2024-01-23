import { defineField } from "sanity";

export default defineField({
  type: "string",
  name: "title",
  title: "Tittel",
  validation: (rule) => rule.required(),
});
