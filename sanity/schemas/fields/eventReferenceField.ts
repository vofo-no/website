import { defineField } from "sanity";

export default defineField({
  name: "eventReference",
  type: "reference",
  title: "Tilnyttet arrangement",
  description: "Knytt dokumentet til et arrangement.",
  to: [{ type: "event" }],
});
