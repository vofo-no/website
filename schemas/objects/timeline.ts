import { defineField, defineType } from "sanity";

export default defineType({
  name: "timeline",
  title: "Timeline",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    {
      name: "milestones",
      title: "Milestones",
      type: "array",
      of: [
        defineField({
          name: "milestone",
          title: "Milestone",
          type: "milestone",
        }),
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return { title };
    },
  },
});
