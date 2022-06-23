import { isSameDay, isSameMonth } from "date-fns";
import { utcToZonedTime, format } from "date-fns-tz";
import { nb as locale } from "date-fns/locale";

const timeZone = "Europe/Oslo";
type RawTime = Date | string | number;

export default function eventTimeDisplay(start: RawTime, end: RawTime) {
  if (!start || !end) return null;
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
