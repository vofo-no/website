import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import contactsField from "../fields/contactsField";
import emailField from "../fields/emailField";
import phoneField from "../fields/phoneField";

export default defineType({
  name: "settings",
  title: "Innstillinger",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "officeAddress",
      title: "Kontoradresse",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "postalAddress",
      title: "Postadresse",
      description: "La stå tom hvis den er lik som kontoradresse",
      type: "string",
    }),
    emailField,
    phoneField,
    defineField({
      name: "shortcuts",
      title: "Snarveier",
      type: "array",
      of: [
        defineArrayMember({
          type: "link",
        }),
      ],
    }),
    defineField({
      name: "about",
      title: "Om oss",
      type: "array",
      of: [
        defineArrayMember({
          type: "link",
        }),
      ],
    }),
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
    contactsField,
  ],
  preview: {
    prepare() {
      return {
        title: "Innstillinger",
      };
    },
  },
});
