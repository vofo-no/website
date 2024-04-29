import { defineField } from "sanity";

export default defineField({
  type: "string",
  name: "title",
  title: "Tittel",
  description: "Tittelen bør være kort, men beskrivende.",
  validation: (rule) => [
    rule.required(),
    rule.min(15).warning("Tittelen er kort. Får leseren nok informasjon?"),
    rule.max(60).warning("Tittelen bør ikke være for lang. Kan den forkortes?"),
  ],
});
