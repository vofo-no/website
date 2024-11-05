import { DocumentIcon } from "@sanity/icons";
import { defineArrayMember, defineField } from "sanity";

import imageField from "./imageField";

export default defineField({
  type: "array",
  name: "body",
  title: "Innhold",
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
                    allowRelative: true,
                  }),
              },
            ],
          },
          {
            name: "assetLink",
            type: "object",
            title: "Lenke til fil",
            icon: DocumentIcon,
            description: "Sett inn en lenke til en opplastet fil.",
            fields: [
              {
                name: "file",
                type: "file",
                title: "Filvedlegg",
              },
            ],
          },
        ],
      },
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Overskrift", value: "h2" },
        { title: "Underoverskrift", value: "h3" },
        { title: "Sitatblokk", value: "blockquote" },
      ],
      lists: [
        { title: "Punktliste", value: "bullet" },
        { title: "Nummerert", value: "number" },
      ],
    }),
    imageField,
    defineArrayMember({
      name: "documentLink",
      type: "documentLink",
    }),
    defineArrayMember({
      name: "people",
      type: "people",
    }),
    defineArrayMember({
      type: "youtube",
    }),
    defineArrayMember({
      type: "audio",
    }),
    defineArrayMember({
      type: "quiz",
    }),
    defineArrayMember({
      type: "cta",
    }),
  ],
});
