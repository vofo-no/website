import isSameDay__Fns from "date-fns/isSameDay";
import utcToZonedTime from "date-fns-tz/utcToZonedTime";
import { RawTime } from "types/time";

import { timeZone } from "./time";

export default function isSameDay(dateLeft?: RawTime, dateRight?: RawTime) {
  if (!dateLeft || !dateRight) return false;
  const zonedDateLeft = utcToZonedTime(dateLeft, timeZone);
  const zonedDateRight = utcToZonedTime(dateRight, timeZone);

  return isSameDay__Fns(zonedDateLeft, zonedDateRight);
}
