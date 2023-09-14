import { defineField } from "sanity";

export default defineField({
  name: "phone",
  title: "Telefon",
  type: "string",
  validation: (rule) => rule.regex(/^\d+$/),
});
