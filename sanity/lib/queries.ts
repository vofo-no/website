import { defineQuery } from "next-sanity";

export const postsByReferenceQuery = defineQuery(`
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
`);

export const searchPostsQuery = defineQuery(`
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
`);

export const postBySlugQuery = defineQuery(`
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
`);

export const pageBySlugQuery = defineQuery(`
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
`);

export const documentLinkByIdQuery = defineQuery(`
  *[_type in ["page", "post"] && _id == $id][0] {
    _type,
    title,
    description,
    "slug": slug.current,
    image,
  }
`);

export const tagByIdQuery = defineQuery(`
  *[_type in ["county", "topic"] && _id == $id][0] {
    _type,
    "title": coalesce(name, title),
    "slug": slug.current,
  }
`);

export const allActiveSfQuery = defineQuery(`
  *[_type == "organization" && active == true && defined(ssbCode) && defined(slug)][]{
    _id,
    "title": name,
    "slug": slug.current,
    description,
    image,
  } | order(title asc)
`);

export const allActiveCountiesQuery = defineQuery(`
  *[_type == "county" && active == true][]{
    _id,
    "title": name,
    "slug": slug.current,
    description,
    image,
  } | order(title asc)
`);

export const countyBySlugQuery = defineQuery(`
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
`);

export const allActiveCoursesQuery = defineQuery(`
  *[_type == "course" && active == true][]{
    _id,
    title,
    "slug": slug.current,
    description,
    image,
    "lessons": lessons[].slug.current,
  } | order(sortOrder asc, title asc)
`);

export const calendarEntryByIdQuery = defineQuery(`
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
`);

export const calendarEntriesQuery = defineQuery(`
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
`);

export const courseBySlugQuery = defineQuery(`
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
`);

export const allActiveTopicsQuery = defineQuery(`
  *[_type == "topic" && active == true][]{
    _id,
    title,
    "slug": slug.current,
    description,
    image,
  } | order(title asc)
`);

export const topicBySlugQuery = defineQuery(`
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
`);

export const personByIdQuery = defineQuery(`
  *[_type == "person" && _id == $id][0] {
    _id,
    name,
    position,
    image,
    email,
    phone,
    description,
  }
`);

export const sdgByIdQuery = defineQuery(`
  *[_type == "sdg" && _id == $id][0] {
    _id,
    number,
    name,
    symbol,
    description,
    url,
  }
`);

export const homeQuery = defineQuery(`*[_type == "home"][0]{
  title,
  description,
  announcement{ emoji, title, href },
}`);

export const settingsQuery = defineQuery(`*[_type == "settings"][0]{
  postalAddress,
  officeAddress,
  email,
  phone, 
  about[]{ title, href },
  shortcuts[]{ title, href },
  some[]{ title, href },
  contacts,
}`);
