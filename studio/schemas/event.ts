import bodyText from "./fields/bodyText";
import description from "./fields/description";
import expiredAt from "./fields/expiredAt";
import image from "./fields/image";
import importance from "./fields/importance";
import publishedAt from "./fields/publishedAt";
import slug from "./fields/slug";
import title from "./title";
import { MdEvent } from "react-icons/md";
import relevance from "./fields/relevance";
import formatLocalTime from "../lib/formatLocalTime";

export default {
  name: "event",
  type: "document",
  title: "Arrangement",
  icon: MdEvent,
  groups: [
    { name: "content", title: "Innhold", default: true },
    { name: "program", title: "Program" },
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
          description: "Oppgi by eller tettsted for fysiske arrangementer",
          type: "string",
        },
        {
          name: "address",
          title: "Adresse",
          description: "Oppgi detaljert adresse, inkludert navn på hotell e.l.",
          type: "string",
        },
      ],
    },
    {
      name: "program",
      type: "array",
      title: "Programposter",
      of: [{ type: "eventProgramItem" }],
      group: "program",
    },
    {
      name: "mainSpeakers",
      type: "array",
      of: [{ type: "eventSpeaker" }],
      title: "Hovedtalere",
      description:
        "Personer som kan trekkes særlig frem i omtale av arrangementet.",
      group: "program",
    },
    {
      name: "registerUrl",
      type: "url",
      title: "Lenke til påmelding",
      group: "content",
    },
    {
      name: "youTubeVideoId",
      type: "string",
      title: "YouTube video-ID",
      description: "ID til opptak eller direktesending på YouTube",
      group: "content",
    },
    publishedAt,
    expiredAt,
    importance,
    {
      ...bodyText,
      description: "Informasjon om arrangementet",
    },
    relevance,
  ],
  preview: {
    select: {
      title: "title",
      start: "start",
      media: "image",
    },
    prepare(selection) {
      const { title, start, media } = selection;
      return {
        title,
        subtitle: start ? formatLocalTime(start) : "(mangler dato)",
        media,
      };
    },
  },
};
