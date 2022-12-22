import { TextAreaWithCounter } from "../../src/StringWithCounter";

export default {
  name: "description",
  type: "text",
  group: "content",
  title: "Beskrivelse",
  components: {
    input: TextAreaWithCounter,
  },
  description: "Kort beskrivelse eller presentasjon av dokumentet.",
  validation: (Rule) => [
    Rule.required(),
    Rule.min(120)
      .max(160)
      .warning("Beskrivelsen bør være mellom 120 og 160 tegn"),
  ],
};
