import { defineField, defineType } from "sanity";

export default defineType({
  name: "expiration",
  title: "Utløp",
  description:
    "Utløp angir at innholdet kan være utdatert etter en gitt dato. Utløpt innhold kan markeres som utløpt eller fjernes fra oversikter over aktuelle saker.",
  type: "object",
  fields: [
    defineField({
      name: "expiredAt",
      type: "datetime",
      title: "Tidspunkt for utløp",
      description: "Standard verdi er om ett år.",
    }),
    defineField({
      name: "explanation",
      description: "En kort forklaring som kan vises etter utløp (valgfritt).",
      title: "Forklaring",
      type: "text",
      validation: (rule) => [
        rule.max(300),
        rule
          .max(160)
          .warning(
            "Forklaringen bør ikke være for lang. Kan du skrive litt kortere?",
          ),
      ],
      rows: 3,
    }),
  ],
});
