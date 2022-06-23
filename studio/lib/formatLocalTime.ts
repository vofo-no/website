import { utcToZonedTime, format } from "date-fns-tz";
import { nb } from "date-fns/locale";

const timeZone = "Europe/Oslo";

export default function formatLocalTime(date: Date | string | number) {
  const zonedDate = utcToZonedTime(date, timeZone);
  const pattern = "PPpp";
  return format(zonedDate, pattern, { timeZone, locale: nb });
}
