import { defineField } from "sanity";

export default defineField({
  name: "email",
  title: "E-postadresse",
  type: "string",
  validation: (rule) => rule.regex(/^\S+@\S+\.\S+$/),
});
