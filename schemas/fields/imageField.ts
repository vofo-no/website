import { ImageIcon } from "@sanity/icons";
import { defineField } from "sanity";

export default defineField({
  type: "image",
  icon: ImageIcon,
  name: "image",
  title: "Bilde",
  options: {
    hotspot: true,
  },
  preview: {
    select: {
      imageUrl: "asset.url",
      title: "caption",
    },
  },
  fields: [
    defineField({
      title: "Bildetekst",
      name: "caption",
      type: "string",
    }),
    defineField({
      name: "credit",
      type: "string",
      title: "Kreditering",
      description:
        'Dersom rettighetshaver krever det, skal kreditering og ev. lisensvilkår vises når vi bruker bildet. F.eks. "Foto: Kari Nordmann"',
    }),
    defineField({
      name: "alt",
      type: "string",
      title: "Alternativ tekst",
      description: "Kort beskrivelse av bildet for brukere som ikke kan se",
      validation: (rule) => rule.required(),
    }),
  ],
});
