import { isSameDay, isSameMonth } from "date-fns";
import { format, utcToZonedTime } from "date-fns-tz";
import { LocaleName } from "types";
import { RawTime } from "types/time";

import { getLocale, timeZone } from "./time";

export default function eventTimeDisplay(
  start: RawTime,
  end: RawTime,
  localeName?: LocaleName
) {
  if (!start || !end) return null;

  const locale = getLocale(localeName);
  const zonedStart = utcToZonedTime(start, timeZone);
  const zonedEnd = utcToZonedTime(end, timeZone);

  if (isSameDay(zonedStart, zonedEnd)) {
    if (format(zonedStart, "p", { timeZone, locale }) == "00:00") {
      return format(zonedStart, "PPP", { timeZone, locale });
    }

    return `${format(zonedStart, "PPPp", { timeZone, locale })}–${format(
      zonedEnd,
      "p",
      { timeZone, locale }
    )}`;
  }

  if (isSameMonth(zonedStart, zonedEnd)) {
    return `${format(zonedStart, "d.", { timeZone, locale })}–${format(
      zonedEnd,
      "PPP",
      { timeZone, locale }
    )}`;
  }

  return `${format(zonedStart, "d. MMMM", { timeZone, locale })}–${format(
    zonedEnd,
    "PPP",
    { timeZone, locale }
  )}`;
}
