import { TiersIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import bodyField from "schemas/fields/bodyField";
import descriptionField from "schemas/fields/descriptionField";

export default defineType({
  name: "learningAssociations",
  title: "Studieforbund",
  type: "document",
  icon: TiersIcon,
  fields: [
    descriptionField,
    defineField({
      name: "organizations",
      title: "Studieforbund",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: { type: "organization" },
        }),
      ],
    }),
    bodyField,
  ],
  preview: {
    select: {
      organizations: "organizations",
    },
    prepare({ organizations }) {
      const subtitle = organizations.length
        ? `${organizations.length} organisasjoner`
        : "(ingen organisasjoner)";

      return {
        title: "Studieforbund",
        subtitle,
      };
    },
  },
});
