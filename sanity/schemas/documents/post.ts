import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { formatDate } from "@/lib/date";
import { postTypes } from "@/lib/postTypes";

import bodyField from "../fields/bodyField";
import descriptionField from "../fields/descriptionField";
import eventReferenceField from "../fields/eventReferenceField";
import imageField from "../fields/imageField";
import localeField from "../fields/localeField";
import publishedAtField from "../fields/publishedAtField";
import relevanceField from "../fields/relevanceField";
import titleField from "../fields/titleField";

export default defineType({
  name: "post",
  type: "document",
  title: "Innlegg",
  icon: DocumentTextIcon,
  groups: [{ name: "innhold", title: "Innhold", default: true }],
  fields: [
    { ...titleField, group: "innhold" },
    defineField({
      name: "docType",
      type: "string",
      title: "Dokumenttype",
      options: {
        list: postTypes,
      },
      group: "innhold",
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: "slug",
      name: "slug",
      title: "Slug",
      options: {
        source: "title",
      },
      validation: (rule) =>
        rule.custom((slug) => {
          if (typeof slug?.current === "undefined") {
            return true;
          }

          const regex = /^[a-z0-9\-]+$/;
          return regex.test(slug.current) ? true : "Ikke en gyldig slug";
        }),
    }),
    { ...descriptionField, group: "innhold" },
    { ...imageField, group: "innhold" },
    publishedAtField,
    { ...bodyField, group: "innhold" },
    defineField({
      name: "attachments",
      type: "array",
      of: [{ type: "file" }],
      title: "Filvedlegg",
      description: "Filer til nedlasting (valgfritt)",
    }),
    defineField({
      name: "remoteUrl",
      type: "url",
      title: "Ekstern lenke",
      description: "Ekstern lenke til dokumentet (valgfritt)",
    }),
    { ...eventReferenceField, group: "innhold" },
    { ...relevanceField, group: "innhold" },
    defineField({
      name: "expiration",
      title: "Utløp",
      type: "expiration",
      options: { collapsible: true, collapsed: true },
    }),
    { ...localeField, group: "innhold" },
  ],
  preview: {
    select: {
      title: "title",
      publishedAt: "publishedAt",
      media: "image",
      docType: "docType",
      description: "description",
    },
    prepare({ docType, description, title, publishedAt, media }) {
      return {
        title,
        subtitle: [
          formatDate({ date: publishedAt }),
          postTypes.find((i) => i.value === docType)?.title,
        ]
          .filter(Boolean)
          .join(" | "),
        media,
        description,
      };
    },
  },
});
