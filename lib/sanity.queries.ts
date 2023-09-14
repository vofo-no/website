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
    body[]{
      ...,
      _type == "people" => {
        ...,
        members[]{
          ...,
          person->
        },
      }
    },
    "toc": body[style == "h2"],
    description,
    title,
    "slug": slug.current,
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

/** temp */
export const homePageTitleQuery = groq`
  *[_type == "home"][0].title
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    "slug": slug.current,
    tags,
    title,
  }
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
  }
`;

/** OLD */

export const navbarQuery = groq`
  
`;

export const getNewsListItemsQuery = groq`
*[_type in ["article", "event", "publication"] && dateTime(publishedAt) < dateTime(now())] | order(publishedAt desc) [0...6] {
  _id,
  _type,
  docType,
  title,
  description,
  image,
  publishedAt,
  "slug": slug.current,
  start,
  end,
  location { name }
}
`;

export const getCalendarItemsQuery = groq`
*[_type == "event" && dateTime(publishedAt) < dateTime(now()) && dateTime(end) > dateTime(now())] | order(start) [0...9] {
  _id,
  _type,
  title,
  description,
  "slug": slug.current,
  start,
  end,
  location { name }
}
`;

export const getAllRegionsQuery = groq`
*[_type == "region" && active] {
  _id,
  _type,
  name,
  description,
  image,
  "slug": slug.current,
}
`;

export const getAllRegionsSlugsQuery = groq`
*[_type == "region" && active] {
  "slug": slug.current,
}
`;

export const getRegionQuery = groq`
*[_type == "region" && slug.current == $slug][0] {
  _id,
  _type,
  name,
  description,
  image,
  contacts[]->{_id,job,person->},
  "news": *[_type in ["article", "event", "publication"] && dateTime(publishedAt) < dateTime(now()) && references(^._id)] | order(publishedAt desc) [0...6] {
    _id,
    _type,
    docType,
    title,
    description,
    image,
    publishedAt,
    "slug": slug.current,
    start,
    end,
    location { name }
  },
  "calendar": *[_type == "event" && dateTime(publishedAt) < dateTime(now()) && dateTime(end) > dateTime(now()) && references(^._id)] | order(start) [0...9] {
    _id,
    _type,
    title,
    description,
    "slug": slug.current,
    start,
    end,
    location { name }
  }
}
`;

export const getAllNewsItemsSlugsQuery = groq`
*[_type == $type && dateTime(publishedAt) < dateTime(now())] {
  "slug": slug.current,
}
`;

export const getNewsItemQuery = groq`
*[_type == $type && slug.current == $slug][0] {
  _id,
  _type,
  docType,
  title,
  description,
  image,
  publishedAt,
  _updatedAt,
  "slug": slug.current,
  start,
  end,
  location { name },
  body,
  "attachment": attachment.asset->url,
  remoteUrl,
  relevance[]->{ _type,_id,name,"slug":slug.current,image,contacts[]->{_id,job,person->}}
}
`;
