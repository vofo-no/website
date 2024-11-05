import { BlockElementIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { CtaPreview } from "./cta-preview";

export const cta = defineType({
  name: "cta",
  type: "object",
  title: "Handling",
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: "label",
      type: "string",
      title: "Tekst",
      description:
        'Tips: Knappen bør være en handling (f.eks. "Meld deg på" heller enn "Påmeldingsskjema")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      type: "url",
      title: "URL",
      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https", "mailto", "tel"],
          allowRelative: true,
        }),
    }),
    defineField({
      name: "subtitle",
      type: "string",
      title: "Undertekst (valgfritt)",
      description: "Ev. kort beskjed til brukerne",
    }),
    defineField({
      name: "target",
      type: "string",
      title: "Mål",
      initialValue: "_self",
      options: {
        list: [
          { title: "Samme vindu (vanlig)", value: "_self" },
          { title: "Nytt vindu/fane", value: "_blank" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "subtitle",
    },
  },
  components: {
    preview: CtaPreview,
  },
});
