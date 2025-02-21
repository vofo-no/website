import { CalendarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { formatDate } from "@/lib/date";

import descriptionField from "../fields/descriptionField";
import titleField from "../fields/titleField";

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
    defineField({
      name: "registrationUrl",
      title: "Lenke til påmelding",
      type: "url",
      validation: (rule) =>
        rule.uri({
          scheme: ["https", "mailto"],
          allowRelative: false,
        }),
    }),
    defineField({
      name: "registrationDueDate",
      title: "Påmeldingsfrist",
      description:
        "Det er mulig å melde seg på til og med denne datoen (valgfritt)",
      type: "date",
    }),
  ],
  preview: {
    select: {
      duration: "duration",
      title: "title",
    },
    prepare({ duration, title }) {
      return {
        subtitle: formatDate({ date: duration?.start, endDate: duration?.end }),
        title,
      };
    },
  },
});
