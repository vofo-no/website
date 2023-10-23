import { CalendarIcon } from "@sanity/icons";
import eventTimeDisplay from "lib/eventTimeDisplay";
import { defineField, defineType } from "sanity";
import descriptionField from "schemas/fields/descriptionField";
import titleField from "schemas/fields/titleField";

export default defineType({
  name: "event",
  type: "document",
  title: "Hendelse",
  icon: CalendarIcon,
  fields: [
    titleField,
    descriptionField,
    defineField({
      type: "duration",
      name: "duration",
      title: "Duration",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Sted",
      type: "object",
      description: "Hvor arrangementet gjennomføres",
      fields: [
        {
          name: "name",
          title: "Stedsnavn",
          description:
            "Oppgi by/tettsted for fysiske arrangementer eller plattform for digitale arrangementer",
          type: "string",
        },
        {
          name: "address",
          title: "Adresse",
          description: "Oppgi detaljert adresse, inkludert navn på hotell e.l.",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "ownEvent",
      title: "Eget arrangement",
      description: "Angir at arrangementet er i regi av Vofo",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      duration: "duration",
      title: "title",
    },
    prepare({ duration, title }) {
      return {
        subtitle:
          duration?.start &&
          duration?.end &&
          eventTimeDisplay(duration.start, duration.end),
        title,
      };
    },
  },
});
