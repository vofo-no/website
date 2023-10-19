import { format, utcToZonedTime } from "date-fns-tz";
import { LocaleName } from "types";
import { RawTime } from "types/time";

import { getLocale, timeZone } from "./time";

export default function formatTime(
  time: RawTime,
  formatString: string,
  localeName?: LocaleName
) {
  if (!time) return null;
  const locale = getLocale(localeName);
  const zoned = utcToZonedTime(time, timeZone);

  return format(zoned, formatString, { timeZone, locale });
}
