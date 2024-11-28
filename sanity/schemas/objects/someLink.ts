import { BadgeHelpIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { SomeIcons } from "@/components/some-icons";

export default defineType({
  name: "someLink",
  title: "SoMe-lenke",
  type: "object",
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Tjeneste",
      options: {
        list: [
          "Bluesky",
          "Facebook",
          "Instagram",
          "LinkedIn",
          "Tiktok",
          "Twitch",
          "YouTube",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: "url",
      name: "href",
      title: "Url",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "href",
    },
    prepare({ title, description }) {
      return {
        title,
        subtitle: description,
        media: SomeIcons[title] || BadgeHelpIcon,
      };
    },
  },
});
