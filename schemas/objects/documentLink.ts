import { ArrowRightIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "documentLink",
  title: "Lenke til dokument",
  icon: ArrowRightIcon,
  type: "object",
  fields: [
    defineField({
      type: "reference",
      name: "item",
      to: [{ type: "publication" }, { type: "article" }],
      validation: (rule) => rule.required(),
      options: { disableNew: true },
    }),
  ],
  preview: {
    select: {
      title: "item.title",
    },
    prepare({ title }) {
      return { title };
    },
  },
});
