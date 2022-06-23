export default {
  name: "publishedAt",
  type: "datetime",
  group: "content",
  title: "Tidspunkt for publisering",
  description: "Publiseringstid for dokumentet",
  initialValue: new Date().toISOString(),
  validation: (Rule) => [Rule.required()],
};
