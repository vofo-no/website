import { TiersIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "organizations",
  title: "Organisasjoner",
  icon: TiersIcon,
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
    }),
    defineField({
      name: "members",
      title: "Medlemmer",
      type: "array",
      validation: (rule) => rule.unique(),
      of: [
        defineArrayMember({
          type: "reference",
          to: { type: "organization" },
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      type: "boolean",
      name: "showContactInfo",
      title: "Vis kontaktinformasjon",
      description:
        "Angir om ev. tilgjengelig kontaktinformasjon skal knyttes til listen",
      initialValue: true,
    }),
    defineField({
      type: "boolean",
      name: "showExtendedInfo",
      title: "Vis ekstra informasjon for studieforbund",
      description:
        "Angir om ev. kursstatistikk og medlemsorganisasjoner skal knyttes til listen",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      members: "members",
    },
    prepare({ title, members }) {
      let subtitle = "(tom liste)";
      if (members.length === 1) subtitle = "1 organisasjon";
      if (members.length > 1) subtitle = `${members.length} organisasjoner`;

      return { title, subtitle };
    },
  },
});
