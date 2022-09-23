import bodyText from "./fields/bodyText";
import description from "./fields/description";
import image from "./fields/image";
import slug from "./fields/slug";
import { MdAccountBalance } from "react-icons/md";

export default {
  name: "learningAssociation",
  type: "document",
  title: "Studieforbund",
  icon: MdAccountBalance,
  groups: [{ name: "content", title: "Innhold", default: true }],
  fields: [
    {
      name: "name",
      title: "Navn",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    },
    { ...description, description: "Kort beskrivelse av studieforbundet" },
    {
      name: "logo",
      type: "image",
      title: "Logo",
      group: "content",
    },
    {
      ...image,
      description: "Bilde som kan vises ved presentasjon av studieforbundet",
    },
    {
      ...bodyText,
      description: "Informasjon om studieforbundet",
    },
    { ...slug, group: null },
    {
      name: "active",
      title: "Aktiv",
      description: "Angir om studieforbundet er aktivt",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "ssbCode",
      title: "SSB-kode",
      description:
        "Kode som identifiserer studieforbundet i offentlig statistikk (25XX)",
      type: "string",
    },
  ],
};
