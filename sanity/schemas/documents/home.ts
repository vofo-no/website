import { HomeIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "home",
  title: "Forsiden",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      description: "Et kort avsnitt som beskriver innholdet på siden.",
      title: "Beskrivelse",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(300).required(),
    }),
    defineField({
      name: "announcement",
      title: "Kunngjøring",
      type: "object",
      fields: [
        defineField({
          type: "string",
          name: "emoji",
          title: "Emoji",
          description: "Valgfri emoji som vises foran kungjøringen",
          validation: (rule) => rule.length(1),
        }),
        defineField({
          type: "string",
          name: "title",
          title: "Tittel",
          validation: (rule) => rule.required(),
        }),
        defineField({
          type: "url",
          name: "href",
          title: "Url",
          validation: (rule) => rule.required().uri({ allowRelative: true }),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        subtitle: "Forsiden",
        title,
      };
    },
  },
});
