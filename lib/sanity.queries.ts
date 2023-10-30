import { groq } from "next-sanity";

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    description,
    "banner": banners[][0] {
      colorScheme,
      description,
      image,
      title,
      url,
    },
    title,
  }
`;

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    "toc": body[style == "h2"],
    description,
    title,
    "slug": slug.current,
  }
`;

export const searchNewsItemsQuery = groq`
  *[
    ((_type in $types) || ((_type == "publication") && (docType in $publicationDocTypes))) &&
    (!defined($years) || string::split(publishedAt, "-")[0] in $years) &&
    (!defined($counties) || references($counties)) &&
    (!defined($topics) || references($topics)) &&
    (!defined($q) || ([title, description, pt::text(body)] match $q))
  ] | order(publishedAt desc) [0...25] {
    _id,
    _type,
    docType,
    title,
    description,
    image,
    publishedAt,
    _updatedAt,
    "slug": slug.current,
    relevance,
  }
`;

export const getNewsItemsQuery = groq`
  *[_type == $type] | order(publishedAt desc) [0...6] {
    _id,
    _type,
    docType,
    title,
    description,
    image,
    publishedAt,
    _updatedAt,
    "slug": slug.current,
    relevance,
  }
`;

export const getNewsItemsByReferenceQuery = groq`
  *[_type == $type && references($ref)] | order(publishedAt desc) [0...6] {
    _id,
    _type,
    docType,
    title,
    description,
    image,
    publishedAt,
    _updatedAt,
    "slug": slug.current,
    relevance,
  }
`;

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    description,
    image,
    publishedAt,
    _updatedAt,
    "slug": slug.current,
    body,
    "toc": body[style == "h2"],
    locale,
    relevance,
    eventReference,
  }
`;

export const publicationBySlugQuery = groq`
  *[_type == "publication" && slug.current == $slug][0] {
    _id,
    docType,
    title,
    description,
    image,
    publishedAt,
    _updatedAt,
    "slug": slug.current,
    body,
    "toc": body[style == "h2"],
    "attachment": attachment.asset->url,
    remoteUrl,
    locale,
    relevance,
    eventReference,
  }
`;

export const associationsPageQuery = groq`
  *[_type == "learningAssociations"][0]{
    _id,
    description,
    body,
    "toc": body[style == "h2"],
    organizations[]->,
  }
`;

export const allActiveCountiesQuery = groq`
  *[_type == "county" && active == true][]{
    _id,
    name,
    "slug": slug.current,
    description,
    image,
  } | order(name asc)
`;

export const countyBySlugQuery = groq`
  *[_type == "county" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    image,
    body,
    contacts,
    countyCode,
    locale,
  }
`;

export const taggedByIdQuery = groq`
  *[_id == $id][0] {
    _id,
    _type,
    title,
    name,
    "slug": slug.current,
  }
`;

export const personByIdQuery = groq`
  *[_type == "person" && _id == $id][0] {
    _id,
    name,
    title,
    image,
    email,
    phone,
  }
`;

export const organzationByIdQuery = groq`
  *[_type == "organization" && _id == $id][0] {
    _id,
    name,
    description,
    logo,
    image,
    email,
    phone,
    url,
  }
`;

export const documentByIdQuery = groq`
  *[_type in ["article", "publication"] && _id == $id][0] {
    _id,
    _type,
    docType,
    title,
    description,
    image,
    "slug": slug.current,
  }
`;

export const allTopicsQuery = groq`
  *[_type == "topic" && active == true] | order(title asc) [] {
    _id,
    _type,
    title,
    description,
    image,
    "slug": slug.current,
  }
`;

export const topicBySlugQuery = groq`
  *[_type == "topic" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    description,
    image,
    "slug": slug.current,
    body,
    "toc": body[style == "h2"],
    contacts,
  }
`;

export const allProjectsQuery = groq`
  *[_type == "project"] | order(active desc, duration.start desc) [] {
    _id,
    _type,
    title,
    description,
    image,
    "slug": slug.current,
    duration,
    active,
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    description,
    image,
    "slug": slug.current,
    duration,
    active,
    body,
    "toc": body[style == "h2"],
    contacts,
    locale,
  }
`;

export const allEventsQuery = groq`
*[_type == "event" && dateTime(duration.end) > dateTime(now())] | order(duration.start) [] {
  _id,
  _type,
  title,
  description,
  duration,
  location,
  ownEvent,
  "newsItems": *[_type in ["article", "publication"] && references(^._id)]{ _type, _id },
}
`;

export const eventByIdQuery = groq`
*[_type == "event" && _id == $id] [0] {
  _id,
  _type,
  title,
  description,
  duration,
  location,
  ownEvent,
}
`;

export const linkableByIdQuery = groq`
*[_type in ["article", "publication"] && _id == $id] [0] {
  _id,
  _type,
  title,
  "slug": slug.current,
  publishedAt,
}
`;

/** temp */
export const homePageTitleQuery = groq`
  *[_type == "home"][0].title
`;

export const projectPaths = groq`
  *[_type == "project" && slug.current != null].slug.current
`;

export const pagePaths = groq`
  *[_type == "page" && slug.current != null].slug.current
`;

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    address,
    phone,
    email,
    some[]{
      title,
      url,
    },
    ogImage,
  }
`;

export const privacyQuery = groq`
  *[_type == "settings"][0]{
    privacy,
    "toc": privacy[style == "h2"],
    _updatedAt,
  }
`;
