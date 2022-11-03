import bodyText from "./fields/bodyText";
import description from "./fields/description";
import image from "./fields/image";
import slug from "./fields/slug";
import { MdShareLocation } from "react-icons/md";
import { Rule } from "@sanity/types";

export default {
  name: "region",
  type: "document",
  title: "Region",
  icon: MdShareLocation,
  groups: [{ name: "content", title: "Innhold", default: true }],
  fields: [
    {
      name: "name",
      title: "Navn",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
      group: "content",
    },
    { ...description, description: "Kort beskrivelse av regionen" },
    {
      ...image,
      description: "Bilde som kan vises ved presentasjon av regionen",
    },
    {
      ...bodyText,
      description: "Informasjon om regionen",
    },
    { ...slug, group: null },
    {
      name: "active",
      title: "Aktiv",
      description: "Angir om regionen er aktiv",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "countyCode",
      title: "Fylkesnummer",
      description: "Kode som identifiserer fylket i offentlig statistikk",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule: Rule) => Rule.unique(),
      options: {
        layout: "tags",
        sortable: false,
      },
    },
  ],
};
