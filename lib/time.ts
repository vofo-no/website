import { enUS, nb, nn } from "date-fns/locale";
import { LocaleName } from "types";

export const timeZone = "Europe/Oslo";

export function getLocale(locale: LocaleName = "nb-NO") {
  switch (locale) {
    case "en-US":
      return enUS;
    case "nn-NO":
      return nn;
    default:
      return nb;
  }
}
