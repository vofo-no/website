import StringWithCounter from "../../src/StringWithCounter";

export default {
  name: "title",
  type: "string",
  title: "Tittel",
  group: "content",
  inputComponent: StringWithCounter,
  validation: (Rule) => [
    Rule.required(),
    Rule.min(15).max(70).warning("Tittelen bør være mellom 15 og 70 tegn"),
  ],
};
