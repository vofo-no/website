import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import emailField from "schemas/fields/emailField";
import phoneField from "schemas/fields/phoneField";

export default defineType({
  name: "settings",
  title: "Innstillinger",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "address",
      title: "Adresse til Vofo",
      type: "string",
    }),
    emailField,
    phoneField,
    defineField({
      name: "some",
      title: "Sosiale medier",
      description: "Lenker til Vofos profiler på sosiale medier.",
      type: "array",
      of: [
        defineArrayMember({
          type: "someLink",
        }),
      ],
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description:
        "Bilde som kan vises på kort i sosiale medier og søkemotorer.",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Innstillinger",
      };
    },
  },
});
