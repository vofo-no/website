export default {
  name: "employee",
  title: "Ansatt",
  type: "document",
  fields: [
    {
      name: "person",
      title: "Person",
      type: "reference",
      to: { type: "person" },
    },
    {
      name: "job",
      title: "Stillingstittel",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "person.name",
      subtitle: "job",
      media: "person.image",
    },
  },
};
