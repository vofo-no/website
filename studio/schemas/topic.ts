import bodyText from "./fields/bodyText";
import description from "./fields/description";
import image from "./fields/image";
import slug from "./fields/slug";
import { MdRemoveRedEye } from "react-icons/md";
import { Rule } from "@sanity/types";

export default {
  name: "topic",
  type: "document",
  title: "Tema",
  icon: MdRemoveRedEye,
  groups: [{ name: "content", title: "Innhold", default: true }],
  fields: [
    {
      name: "name",
      title: "Navn",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
      group: "content",
    },
    { ...description, description: "Kort beskrivelse av temaet" },
    {
      ...image,
      description: "Bilde som kan vises ved presentasjon av temaet",
    },
    {
      ...bodyText,
      description:
        "Informasjon om temaet, hvorfor vi jobber med det og hva vi ønsker å oppnå.",
    },
    { ...slug, group: null },
  ],
};
