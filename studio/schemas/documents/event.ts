import bodyText from "../fields/bodyText";
import description from "../fields/description";
import expiredAt from "../fields/expiredAt";
import image from "../fields/image";
import importance from "../fields/importance";
import publishedAt from "../fields/publishedAt";
import slug from "../fields/slug";
import title from "../fields/title";
import { MdEvent } from "react-icons/md";

export default {
  name: "event",
  type: "document",
  title: "Arrangement",
  icon: MdEvent,
  groups: [
    { name: "content", title: "Innhold", default: true },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    title,
    slug,
    description,
    image,
    {
      name: "start",
      title: "Starttid",
      description:
        "Tidspunktet arrangementet starter (bruk klokkeslett 00:00 hvis klokkeslett ikke er fastsatt/relevant)",
      type: "datetime",
      group: "content",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "end",
      title: "Sluttid",
      type: "datetime",
      description: "Tidspunktet arrangementet slutter",
      group: "content",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "location",
      title: "Sted",
      type: "object",
      description: "Hvor arrangementet gjennomføres",
      group: "content",
      fields: [
        {
          name: "name",
          title: "Stedsnavn",
          type: "string",
        },
      ],
    },
    publishedAt,
    expiredAt,
    importance,
    {
      ...bodyText,
      description: "Informasjon om arrangementet",
    },
  ],
};
