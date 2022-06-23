import bodyText from "../fields/bodyText";
import description from "../fields/description";
import expiredAt from "../fields/expiredAt";
import image from "../fields/image";
import importance from "../fields/importance";
import publishedAt from "../fields/publishedAt";
import slug from "../fields/slug";
import title from "../fields/title";
import { MdOutlineArticle } from "react-icons/md";
import formatLocalTime from "../../lib/formatLocalTime";

export default {
  name: "article",
  type: "document",
  title: "Artikkel",
  icon: MdOutlineArticle,
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
    publishedAt,
    expiredAt,
    importance,
    {
      ...bodyText,
    },
  ],
  orderings: [
    {
      title: "Publiseringsdato",
      name: "publishedAt",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      publishedAt: "publishedAt",
      media: "image",
    },
    prepare(selection) {
      const { title, publishedAt, media } = selection;
      return {
        title,
        subtitle: publishedAt ? formatLocalTime(publishedAt) : "(mangler dato)",
        media,
      };
    },
  },
};
