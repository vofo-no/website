import { MdEvent } from "react-icons/md";
import { defineField, defineType } from "sanity";
import bodyField from "schemas/fields/bodyField";
import descriptionField from "schemas/fields/descriptionField";
import imageField from "schemas/fields/imageField";
import publishedAtField from "schemas/fields/publishedAtField";
import relevanceField from "schemas/fields/relevanceField";
import titleField from "schemas/fields/titleField";

export default defineType({
  name: "event",
  type: "document",
  title: "Hendelse",
  icon: MdEvent,
  fields: [
    titleField,
    defineField({
      type: "slug",
      name: "slug",
      title: "Slug",
      options: {
        source: "title",
      },
      validation: (rule) => rule.required(),
    }),
    descriptionField,
    imageField,
    bodyField,
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
          description: "Oppgi by eller tettsted for fysiske arrangementer",
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
    publishedAtField,
    relevanceField,
  ],
  preview: {
    select: {
      duration: "duration",
      image: "image",
      title: "title",
    },
    prepare({ duration, image, title }) {
      return {
        media: image,
        subtitle: [
          duration?.start && new Date(duration.start).getFullYear(),
          duration?.end && new Date(duration.end).getFullYear(),
        ]
          .filter(Boolean)
          .join(" - "),
        title,
      };
    },
  },
});
