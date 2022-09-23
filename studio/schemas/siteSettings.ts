import { Rule } from "@sanity/types";

export default {
  name: "siteSettings",
  type: "document",
  fields: [
    {
      name: "Ansatte",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "employee" },
        },
      ],
    },
    {
      name: "mainOffice",
      type: "office",
      title: "Hovedkontor",
    },
    {
      name: "offices",
      type: "array",
      title: "Regionskontorer",
      of: [{ type: "office" }],
    },
    {
      name: "email",
      type: "string",
      title: "E-postadresse (sentralbord)",
      validation: (Rule: Rule) => Rule.required().regex(/^\S+@\S+\.\S+$/),
    },
    {
      name: "phone",
      type: "string",
      title: "Telefonnummer (sentralbord)",
      validation: (Rule: Rule) => Rule.required().regex(/^\d+$/),
    },
    {
      name: "facebookSite",
      type: "string",
      title: "Facebook-side",
      validation: (Rule) => Rule.regex(/^[\w-]+$/),
    },
    {
      name: "twitterUsername",
      type: "string",
      title: "Twitter-brukernavn",
      validation: (Rule) => Rule.regex(/^[\w-]+$/),
    },
    {
      name: "youtubeChannelId",
      type: "string",
      title: "YouTube kanal-ID",
      validation: (Rule) => Rule.regex(/^[\w-]+$/),
    },
    {
      name: "privacyPolicy",
      title: "Personvernerklæring",
      type: "blockContent",
    },
  ],
};
