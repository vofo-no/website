export default {
  name: "employee",
  title: "Ansatt",
  type: "document",
  fields: [
    {
      name: "person",
      title: "Person",
      type: "person",
    },
    {
      name: "job",
      title: "Stillingstittel",
      type: "string",
    },
  ],
  preview: {
    select: {
      name: "person.name",
      job: "job",
      media: "person.image",
    },
    prepare(selection) {
      const { name, job, media } = selection;
      return {
        title: name,
        subtitle: job,
        media,
      };
    },
  },
};
