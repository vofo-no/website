import { loadCalendarEntries } from "@/sanity/loader/loadQuery";

import { CalendarPageLayout } from "@/components/pages/calendar-page";

export default async function CalendarPage() {
  const data = await loadCalendarEntries();

  return <CalendarPageLayout data={data} />;
}
