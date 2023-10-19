import { defineField } from "sanity";

export default defineField({
  type: "string",
  name: "locale",
  title: "Språk",
  options: {
    list: [
      { title: "Norsk bokmål", value: "nb-NO" },
      { title: "Norsk nynorsk", value: "nn-NO" },
      { title: "Engelsk", value: "en-US" },
    ],
  },
});
