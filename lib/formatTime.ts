import { nb as locale } from "date-fns/locale";
import { format, utcToZonedTime } from "date-fns-tz";

const timeZone = "Europe/Oslo";
export type RawTime = Date | string | number;

export default function formatTime(time: RawTime, formatString: string) {
  if (!time) return null;
  const zoned = utcToZonedTime(time, timeZone);

  return format(zoned, formatString, { timeZone, locale });
}
