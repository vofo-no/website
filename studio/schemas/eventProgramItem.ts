import { Rule } from "@sanity/types";
import formatLocalTime from "../lib/formatLocalTime";

export default {
  name: "eventProgramItem",
  type: "object",
  title: "Programpost",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Tittel",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "description",
      type: "string",
      title: "Kort beskrivelse",
    },
    {
      name: "start",
      type: "datetime",
      title: "Tidspunkt",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "level",
      type: "string",
      title: "Nivå",
      initialValue: "default",
      options: {
        list: [
          { title: "Standard", value: "default" },
          { title: "Underordnet", value: "sub" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "speakers",
      type: "array",
      of: [{ type: "eventSpeaker" }],
      title: "Talere",
    },
  ],
  preview: {
    select: {
      title: "title",
      start: "start",
      level: "level",
    },
    prepare(selection) {
      const { title, start, level } = selection;
      return {
        title: `${level === "sub" ? "→ " : ""}${title}`,
        subtitle: start ? formatLocalTime(start) : "(mangler dato)",
      };
    },
  },
};
