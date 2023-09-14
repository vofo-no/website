import formatTime from "lib/formatTime";
import { MdOutlineArticle } from "react-icons/md";
import { defineField, defineType } from "sanity";
import bodyField from "schemas/fields/bodyField";
import descriptionField from "schemas/fields/descriptionField";
import imageField from "schemas/fields/imageField";
import publishedAtField from "schemas/fields/publishedAtField";
import relevanceField from "schemas/fields/relevanceField";
import titleField from "schemas/fields/titleField";

export default defineType({
  name: "article",
  type: "document",
  title: "Artikkel",
  icon: MdOutlineArticle,
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
    publishedAtField,
    relevanceField,
  ],
  orderings: [
    {
      title: "Publiseringsdato",
      name: "publishedAt",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      publishedAt: "publishedAt",
      media: "image",
    },
    prepare({ title, publishedAt, media }) {
      return {
        title,
        subtitle: formatTime(publishedAt, "PPpp") || "(mangler dato)",
        media,
      };
    },
  },
});
