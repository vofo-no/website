import { defineField } from "sanity";

export default defineField({
  name: "description",
  description:
    "En kort beskrivelse. Beskrivelsen bør være unik for dette elementet.",
  title: "Beskrivelse",
  type: "text",
  validation: (rule) => [
    rule.max(300),
    rule
      .max(160)
      .warning(
        "Beskrivelsen bør ikke være for lang. Kan du skrive litt kortere?",
      ),
  ],
  rows: 3,
});
