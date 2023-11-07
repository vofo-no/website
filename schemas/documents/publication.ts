import { DocumentTextIcon } from "@sanity/icons";
import formatTime from "lib/formatTime";
import postTypes from "lib/postTypes";
import { defineField, defineType } from "sanity";
import bodyField from "schemas/fields/bodyField";
import descriptionField from "schemas/fields/descriptionField";
import eventReferenceField from "schemas/fields/eventReferenceField";
import imageField from "schemas/fields/imageField";
import localeField from "schemas/fields/localeField";
import publishedAtField from "schemas/fields/publishedAtField";
import relevanceField from "schemas/fields/relevanceField";
import titleField from "schemas/fields/titleField";

export default defineType({
  name: "publication",
  type: "document",
  title: "Innlegg",
  icon: DocumentTextIcon,
  fields: [
    titleField,
    defineField({
      name: "docType",
      type: "string",
      title: "Dokumenttype",
      options: {
        list: postTypes,
      },
      validation: (rule) => rule.required(),
    }),
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
    publishedAtField,
    bodyField,
    defineField({
      name: "attachment",
      type: "file",
      title: "Filvedlegg",
      description: "Filversjon av dokumentet til nedlasting (valgfritt)",
    }),
    defineField({
      name: "remoteUrl",
      type: "url",
      title: "Ekstern lenke",
      description: "Ekstern lenke til dokumentet (valgfritt)",
    }),
    eventReferenceField,
    relevanceField,
    localeField,
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
        subtitle: `${formatTime(publishedAt, "Pp")} | ${
          postTypes.find((i) => i.value === docType)?.title
        }`,
        media,
        description,
      };
    },
  },
});
