import { loadCalendarEntries } from "@/sanity/loader/loadQuery";

import { CalendarPageLayout } from "@/components/pages/calendar-page";

interface CalendarArchivePageProps {
  params: Promise<{ aarstall: string }>;
}

export default async function CalendarArchivePage(
  props: CalendarArchivePageProps,
) {
  const params = await props.params;
  const { data } = await loadCalendarEntries(params.aarstall);

  return <CalendarPageLayout data={data} archiveName={params.aarstall} />;
}
