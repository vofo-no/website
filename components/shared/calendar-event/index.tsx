import { loadCalendarEntryById } from "@/sanity/loader/loadQuery";

import { CalendarEventLayout } from "./layout";

export interface CalendarEventProps {
  id: string;
}

export async function CalendarEvent({ id }: CalendarEventProps) {
  const data = await loadCalendarEntryById(id);

  return data ? (
    <div className="mt-6 mb-12">
      <CalendarEventLayout data={data} />
    </div>
  ) : null;
}
