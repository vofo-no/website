import { defineField } from "sanity";

export default defineField({
  name: "publishedAt",
  type: "datetime",
  title: "Tidspunkt for publisering",
  initialValue: new Date().toISOString(),
  validation: (rule) => rule.required(),
});
