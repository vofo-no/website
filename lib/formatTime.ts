import { utcToZonedTime, format } from "date-fns-tz";
import { nb as locale } from "date-fns/locale";

const timeZone = "Europe/Oslo";
type RawTime = Date | string | number;

export default function formatTime(time: RawTime, formatString: string) {
  if (!time) return null;
  const zoned = utcToZonedTime(time, timeZone);

  return format(zoned, formatString, { timeZone, locale });
}
