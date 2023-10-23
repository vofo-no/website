import { publicationDocTypes } from "lib/publicationDocTypes";
import { MdOutlineAttachment } from "react-icons/md";
import { defineField, defineType } from "sanity";
import bodyField from "schemas/fields/bodyField";
import descriptionField from "schemas/fields/descriptionField";
import eventReferenceField from "schemas/fields/eventReferenceField";
import imageField from "schemas/fields/imageField";
import localeField from "schemas/fields/localeField";
import publishedAtField from "schemas/fields/publishedAtField";
import relevanceField from "schemas/fields/relevanceField";
import titleField from "schemas/fields/titleField";

const publicationBodyField: typeof bodyField = {
  ...bodyField,
  description: "Tekstversjon av dokumentet (valgfritt)",
};

export default defineType({
  name: "publication",
  type: "document",
  title: "Dokument",
  icon: MdOutlineAttachment,
  fields: [
    titleField,
    defineField({
      name: "docType",
      type: "string",
      title: "Dokumenttype",
      options: {
        list: publicationDocTypes,
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
    publicationBodyField,
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
});
