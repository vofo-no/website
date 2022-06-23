export default {
  name: "importance",
  type: "string",
  group: "seo",
  title: "Viktighet",
  description: "Angir hvordan dette dokumentet skal rangeres i presentasjoner",
  initialValue: "normal",
  options: {
    list: [
      { title: "Lav", value: "low" },
      { title: "Normal", value: "normal" },
      { title: "Høy", value: "high" },
    ],
    layout: "radio",
    direction: "horizontal",
  },
};
