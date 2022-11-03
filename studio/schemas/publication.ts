import bodyText from "./fields/bodyText";
import description from "./fields/description";
import expiredAt from "./fields/expiredAt";
import image from "./fields/image";
import importance from "./fields/importance";
import publishedAt from "./fields/publishedAt";
import slug from "./fields/slug";
import title from "./title";
import { MdOutlineAttachment } from "react-icons/md";
import { publicationDocTypes } from "../lib/publicationDocTypes";
import relevance from "./fields/relevance";

export default {
  name: "publication",
  type: "document",
  title: "Dokument",
  icon: MdOutlineAttachment,
  groups: [
    { name: "content", title: "Innhold", default: true },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    title,
    {
      name: "docType",
      type: "string",
      title: "Dokumenttype",
      group: "content",
      options: {
        list: publicationDocTypes,
      },
      validation: (Rule) => [Rule.required()],
    },
    slug,
    description,
    image,
    publishedAt,
    expiredAt,
    importance,
    {
      ...bodyText,
      description: "Tekstversjon av dokumentet (valgfritt)",
    },
    {
      name: "attachment",
      type: "file",
      group: "content",
      title: "Filvedlegg",
      description: "Filversjon av dokumentet til nedlasting (valgfritt)",
    },
    {
      name: "remoteUrl",
      type: "url",
      group: "content",
      title: "Ekstern lenke",
      description: "Ekstern lenke til dokumentet (valgfritt)",
    },
    relevance,
  ],
};
