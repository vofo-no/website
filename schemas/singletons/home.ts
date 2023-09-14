import { HomeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "home",
  title: "Hovedside",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "title",
      description: "Tittel på hovedsiden",
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
      name: "banners",
      title: "Banner på hovedsiden",
      description: "Bannere som vises på hovedsiden.",
      type: "array",
      of: [
        defineArrayMember({
          type: "banner",
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
        subtitle: "Hovedside",
        title,
      };
    },
  },
});
