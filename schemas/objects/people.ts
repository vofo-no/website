import { UserIcon, UsersIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "people",
  title: "Personer",
  icon: UsersIcon,
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
    }),
    {
      name: "members",
      title: "Medlemmer",
      type: "array",
      validation: (rule) => rule.unique(),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              type: "reference",
              name: "person",
              to: [{ type: "person" }],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              title: "Overstyr tittel (valgfritt)",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "person.name",
              subtitle: "person.title",
              overrideSubtitle: "title",
              media: "person.image",
            },
            prepare({ title, subtitle, overrideSubtitle, media }) {
              return {
                title,
                subtitle: overrideSubtitle || subtitle,
                media: media || UserIcon,
              };
            },
          },
        }),
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      members: "members",
    },
    prepare({ title, members }) {
      let subtitle = "(tom liste)";
      if (members.length === 1) subtitle = "1 person";
      if (members.length > 1) subtitle = `${members.length} personer`;

      return { title, subtitle };
    },
  },
});
