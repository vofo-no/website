import { groq } from "next-sanity";

export const postsByReferenceQuery = groq`
  *[
    (_type == "post") && 
    (!defined($ref) || references($ref))
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
    "attachment": attachment.asset->url,
    remoteUrl,
    locale,
    "relevance": relevance[] -> {
      _id,
      _type,
      "title": coalesce(name, title),
      "slug": slug.current,
    },
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
}`;
