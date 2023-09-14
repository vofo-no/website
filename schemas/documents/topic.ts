import { MdRemoveRedEye } from "react-icons/md";
import { defineArrayMember, defineField, defineType } from "sanity";
import bodyField from "schemas/fields/bodyField";
import descriptionField from "schemas/fields/descriptionField";
import imageField from "schemas/fields/imageField";

export default defineType({
  name: "topic",
  type: "document",
  title: "Tema",
  icon: MdRemoveRedEye,
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      description: "Kort tittel, helst bare ett ord",
      type: "string",
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
    bodyField,
    imageField,
    defineField({
      name: "contacts",
      title: "Kontaktpersoner",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: { type: "person" },
        }),
      ],
    }),
    defineField({
      name: "active",
      title: "Aktiv",
      description: "Angir om temaet er aktivt",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
