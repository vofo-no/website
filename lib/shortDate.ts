import { utcToZonedTime, format } from "date-fns-tz";
import { nb as locale } from "date-fns/locale";

const timeZone = "Europe/Oslo";
type RawTime = Date | string | number;

export default function shortDate(time: RawTime) {
  if (!time) return null;
  const zoned = utcToZonedTime(time, timeZone);

  return format(zoned, "P", { timeZone, locale });
}
