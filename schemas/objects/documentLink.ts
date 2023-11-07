import { ArrowRightIcon } from "@sanity/icons";
import formatTime from "lib/formatTime";
import postTypes from "lib/postTypes";
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
      to: [{ type: "publication" }],
      validation: (rule) => rule.required(),
      options: { disableNew: true },
    }),
  ],
  preview: {
    select: {
      title: "item.title",
      publishedAt: "item.publishedAt",
      media: "item.image",
      docType: "item.docType",
      description: "item.description",
    },
    prepare({ docType, description, title, publishedAt, media }) {
      return {
        title,
        subtitle: `${formatTime(publishedAt, "Pp")} | ${
          postTypes.find((i) => i.value === docType)?.title
        }`,
        media,
        description,
      };
    },
  },
});
