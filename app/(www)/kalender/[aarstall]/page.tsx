import { loadCalendarEntries } from "@/sanity/loader/loadQuery";

import { CalendarPageLayout } from "@/components/pages/calendar-page";

interface CalendarArchivePageProps {
  params: { aarstall: string };
}

export default async function CalendarArchivePage({
  params,
}: CalendarArchivePageProps) {
  const data = await loadCalendarEntries(params.aarstall);

  return <CalendarPageLayout data={data} archiveName={params.aarstall} />;
}
