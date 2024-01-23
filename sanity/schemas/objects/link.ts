import { LinkIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "link",
  title: "Lenke",
  icon: LinkIcon,
  type: "object",
  fields: [
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
  preview: {
    select: {
      title: "title",
      description: "href",
    },
    prepare({ title, description }) {
      return {
        title,
        subtitle: description,
      };
    },
  },
});
