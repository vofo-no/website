import { liteClient as algoliasearch } from "algoliasearch/lite";

import { appId, searchToken } from "./api";

export const client = algoliasearch(appId, searchToken);
