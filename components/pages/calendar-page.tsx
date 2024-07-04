import { CalendarEntryPayload } from "@/types";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { CalendarEntry } from "@/components/calendar-entry";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

const FIRST_YEAR = 2024;

export function CalendarPageLayout(props: {
  data: CalendarEntryPayload[];
  archiveName?: string;
}) {
  const currentYear = new Date().getFullYear();
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Kalender</PageHeaderHeading>
        <PageHeaderDescription>
          {props.archiveName
            ? `Arkiv for ${props.archiveName}`
            : "Hva skjer hos Vofo? 🕺"}
        </PageHeaderDescription>
      </PageHeader>

      {props.data.length ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-12 mb-8">
          {props.data?.map((item) => (
            <CalendarEntry key={item._id} data={item} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground mb-16">
          Ingen hendelser... 😴
        </p>
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem className="font-semibold">Arkiv:</PaginationItem>
          {[...Array(currentYear - FIRST_YEAR + 1)].map((_, i) => {
            const year = FIRST_YEAR + i;
            return (
              <PaginationItem key={year}>
                <PaginationLink
                  href={`/kalender/${year}`}
                  isActive={String(year) === props.archiveName}
                  size="default"
                >
                  {year}
                </PaginationLink>
              </PaginationItem>
            );
          })}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
