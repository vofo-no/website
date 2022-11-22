import { Rule } from "@sanity/types";

export default {
  name: "eventSpeaker",
  type: "object",
  title: "Taler",
  fields: [
    {
      name: "person",
      type: "reference",
      to: { type: "person" },
      title: "Person",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "role",
      type: "string",
      title: "Rolle for arrangementet",
    },
    {
      name: "bio",
      type: "text",
      title: "Kort beskrivelse",
    },
  ],
  preview: {
    select: {
      title: "person.name",
      subtitle: "role",
      media: "person.image",
    },
  },
};
