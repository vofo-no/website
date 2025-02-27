import { groq } from "next-sanity";

export const postsByReferenceQuery = groq`
  *[
    (_type == "post") && 
    defined(image) &&
    (!defined($ref) || references($ref)) &&
    (
      (defined(expiration.expiredAt) && dateTime(now()) < dateTime(expiration.expiredAt)) || 
      (!defined(expiration.expiredAt) && dateTime(now()) < dateTime(now()) + 31556926)
    )
  ] | order(publishedAt desc) [0...6] {
    _id,
    _type,
    docType,
    title,
    description,
    image,
    publishedAt,
    _updatedAt,
    "slug": slug.current,
    "relevance": relevance[] -> {
      _id,
      _type,
      "title": coalesce(name, title),
      "slug": slug.current,
    },
  }
`;

export const searchPostsQuery = groq`
  *[
    (_type == "post") &&
    (!defined($docTypes) || docType in $docTypes) &&
    (!defined($years) || string::split(publishedAt, "-")[0] in $years) &&
    (!defined($refs) || references($refs)) &&
    (!defined($q) || ([title, description, pt::text(body)] match $q)) &&
    (!defined($lastPublishedAt) || (publishedAt < $lastPublishedAt || (publishedAt == $lastPublishedAt && _id < $lastId)))
  ] | order(publishedAt desc) [0...30] {
    _id,
    _type,
    docType,
    title,
    description,
    image,
    publishedAt,
    _updatedAt,
    "slug": slug.current,
    "relevance": relevance[] -> {
      _id,
      _type,
      "title": coalesce(name, title),
      "slug": slug.current,
    },
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
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
    "attachments": attachments[].asset -> { _id, assetId, originalFilename, mimeType, size },
    expiration,
    remoteUrl,
    locale,
    relevance,
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    description,
    _updatedAt,
    "slug": slug.current,
    body,
    "toc": body[style == "h2"],
    contacts,
    locale,
  }
`;

export const documentLinkByIdQuery = groq`
  *[_type in ["page", "post"] && _id == $id][0] {
    _type,
    title,
    description,
    "slug": slug.current,
    image,
  }
`;

export const tagByIdQuery = groq`
  *[_type in ["county", "topic"] && _id == $id][0] {
    _type,
    "title": coalesce(name, title),
    "slug": slug.current,
  }
`;

export const allActiveSfQuery = groq`
  *[_type == "organization" && active == true && defined(ssbCode) && defined(slug)][]{
    _id,
    "title": name,
    "slug": slug.current,
    description,
    image,
  } | order(title asc)
`;

export const allActiveCountiesQuery = groq`
  *[_type == "county" && active == true][]{
    _id,
    "title": name,
    "slug": slug.current,
    description,
    image,
  } | order(title asc)
`;

export const countyBySlugQuery = groq`
  *[_type == "county" && slug.current == $slug][0] {
    _id,
    "title": name,
    "slug": slug.current,
    description,
    image,
    body,
    contacts,
    countyCode,
    locale,
  }
`;

export const allActiveCoursesQuery = groq`
  *[_type == "course" && active == true][]{
    _id,
    title,
    "slug": slug.current,
    description,
    image,
    "lessons": lessons[].slug.current,
  } | order(sortOrder asc, title asc)
`;

export const calendarEntryByIdQuery = groq`
  *[_type == "event" && _id == $id][0] {
    _id,
    title,
    description,
    duration,
    location,
    ownEvent,
    registrationUrl,
    registrationDueDate,
  }
`;

export const calendarEntriesQuery = groq`
  *[_type == "event" &&
    (!defined($year) || string::split(duration.start, "-")[0] == $year) &&
    (defined($year) || dateTime(now()) < dateTime(coalesce(duration.end, duration.start)))
  ][]{
    _id,
    title,
    description,
    duration,
    location,
    ownEvent,
    registrationUrl,
    registrationDueDate,
    "relatedPost": *[_type=='post' && references(^._id)] | order(publishedAt desc) [0] {
      _type,
      title,
      description,
      "slug": slug.current,
      image
    } 
  } | order(duration.start asc, duration.end asc)
`;

export const courseBySlugQuery = groq`
  *[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    image,
    body,
    lessons[] {
      title,
      "slug": slug.current,
      description,
      body,
    },
  }
`;

export const allActiveTopicsQuery = groq`
  *[_type == "topic" && active == true][]{
    _id,
    title,
    "slug": slug.current,
    description,
    image,
  } | order(title asc)
`;

export const topicBySlugQuery = groq`
  *[_type == "topic" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    _updatedAt,
    image,
    body,
    "toc": body[style == "h2"],
    contacts,
    locale,
  }
`;

export const personByIdQuery = groq`
  *[_type == "person" && _id == $id][0] {
    _id,
    name,
    position,
    image,
    email,
    phone,
  }
`;

export const sdgByIdQuery = groq`
  *[_type == "sdg" && _id == $id][0] {
    _id,
    number,
    name,
    symbol,
    description,
    url,
  }
`;

export const homeQuery = groq`*[_type == "home"][0]{
  title,
  description,
  announcement{ emoji, title, href },
}`;

export const settingsQuery = groq`*[_type == "settings"][0]{
  postalAddress,
  officeAddress,
  email,
  phone, 
  about[]{ title, href },
  shortcuts[]{ title, href },
  some[]{ title, href },
  contacts,
}`;
