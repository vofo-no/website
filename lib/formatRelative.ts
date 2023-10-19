import formatRelative__Fns from "date-fns/formatRelative";
import utcToZonedTime from "date-fns-tz/utcToZonedTime";
import { LocaleName } from "types";
import { RawTime } from "types/time";

import { getLocale, timeZone } from "./time";

export default function formatRelative(
  time?: RawTime,
  localeName?: LocaleName
) {
  if (!time) return null;
  const locale = getLocale(localeName);
  const zoned = utcToZonedTime(time, timeZone);

  return formatRelative__Fns(zoned, new Date(), { locale });
}
