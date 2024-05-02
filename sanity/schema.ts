import { type SchemaTypeDefinition } from "sanity";

import county from "./schemas/documents/county";
import event from "./schemas/documents/event";
import home from "./schemas/documents/home";
import organization from "./schemas/documents/organization";
import page from "./schemas/documents/page";
import person from "./schemas/documents/person";
import post from "./schemas/documents/post";
import settings from "./schemas/documents/settings";
import topic from "./schemas/documents/topic";
import documentLink from "./schemas/objects/documentLink";
import duration from "./schemas/objects/duration";
import link from "./schemas/objects/link";
import people from "./schemas/objects/people";
import someLink from "./schemas/objects/someLink";
import { youtube } from "./schemas/objects/youtube";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Singletons
    home,
    settings,
    // Documents
    post,
    page,
    event,
    topic,
    county,
    person,
    organization,
    // Objects
    documentLink,
    duration,
    link,
    people,
    someLink,
    youtube,
  ],
};
