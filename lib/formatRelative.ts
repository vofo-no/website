import formatRelative__Fns from "date-fns/formatRelative";
import utcToZonedTime from "date-fns-tz/utcToZonedTime";
import { RawTime } from "types/time";

import { locale, timeZone } from "./time";

export default function formatRelative(time?: RawTime) {
  if (!time) return null;
  const zoned = utcToZonedTime(time, timeZone);

  return formatRelative__Fns(zoned, new Date(), { locale });
}
