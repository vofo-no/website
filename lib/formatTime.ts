import { format, utcToZonedTime } from "date-fns-tz";
import { RawTime } from "types/time";

import { locale, timeZone } from "./time";

export default function formatTime(time: RawTime, formatString: string) {
  if (!time) return null;
  const zoned = utcToZonedTime(time, timeZone);

  return format(zoned, formatString, { timeZone, locale });
}
