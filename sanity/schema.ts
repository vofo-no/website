import { type SchemaTypeDefinition } from "sanity";

import county from "./schemas/documents/county";
import course from "./schemas/documents/course";
import event from "./schemas/documents/event";
import home from "./schemas/documents/home";
import organization from "./schemas/documents/organization";
import page from "./schemas/documents/page";
import person from "./schemas/documents/person";
import post from "./schemas/documents/post";
import settings from "./schemas/documents/settings";
import topic from "./schemas/documents/topic";
import { audio } from "./schemas/objects/audio";
import choice from "./schemas/objects/choice";
import documentLink from "./schemas/objects/documentLink";
import duration from "./schemas/objects/duration";
import expiration from "./schemas/objects/expiration";
import lesson from "./schemas/objects/lesson";
import link from "./schemas/objects/link";
import people from "./schemas/objects/people";
import quiz from "./schemas/objects/quiz";
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
    course,
    person,
    organization,
    // Objects
    audio,
    choice,
    documentLink,
    duration,
    expiration,
    lesson,
    link,
    people,
    quiz,
    someLink,
    youtube,
  ],
};
