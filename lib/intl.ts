import "server-only";

import { createIntl, createIntlCache, IntlShape } from "@formatjs/intl";
import { LocaleName } from "types";

import { timeZone } from "./time";

const dictionaries = {
  "nb-NO": () =>
    import("./dictionaries/nb.json").then((module) => module.default),
  "nn-NO": () =>
    import("./dictionaries/nn.json").then((module) => module.default),
  "en-US": () =>
    import("./dictionaries/en.json").then((module) => module.default),
};

async function getDictionary(locale: LocaleName) {
  return dictionaries[locale]();
}

const cache = createIntlCache();
const intls: Record<string, IntlShape<string>> = {};

export async function getIntl(locale: LocaleName = "nb-NO") {
  locale = locale || "nb-NO";
  if (!intls.hasOwnProperty(locale)) {
    const messages = await getDictionary(locale);

    intls[locale] = createIntl({ locale, messages, timeZone }, cache);
  }

  return intls[locale];
}

const intl = await getIntl();

export default intl;
