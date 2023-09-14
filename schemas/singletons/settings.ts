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
    defineField({
      type: "array",
      name: "privacy",
      title: "Personvernerklæring",
      description: "Vofo sin personvernerklæring",
      of: [
        defineArrayMember({
          type: "block",
          marks: {
            decorators: [
              { title: "Fet", value: "strong" },
              { title: "Kursiv", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "Url",
                    validation: (rule) =>
                      rule.uri({
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  },
                ],
              },
            ],
          },
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Overskrift", value: "h2" },
          ],
          lists: [{ title: "Punktliste", value: "bullet" }],
        }),
      ],
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
