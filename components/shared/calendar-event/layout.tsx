import Link from "next/link";
import { CalendarEntryPayload } from "@/types";
import { ArrowRightIcon } from "lucide-react";

import { formatDate } from "@/lib/date";
import { resolveHref } from "@/lib/resolveHref";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CalendarEventLayoutProps {
  data: CalendarEntryPayload;
}

function isFutureDate(date: Date) {
  return new Date(date.toDateString()) > new Date(new Date().toDateString());
}

export function CalendarEventLayout({ data }: CalendarEventLayoutProps) {
  const start = new Date(data.duration.start);
  const hideTime =
    (data.duration.end &&
      data.duration.end.split("T")[0] !== data.duration.start.split("T")[0]) ||
    start.toLocaleString("nb", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Oslo",
    }) === "00:00";

  const registrationDueDate = data.registrationDueDate
    ? new Date(data.registrationDueDate)
    : null;
  const isPastRegistrationDate = !isFutureDate(registrationDueDate || start);

  return (
    <div className="flex gap-3 justify-start not-prose">
      <div
        className={cn(
          "w-12 h-14 shrink-0 text-white flex flex-col items-center justify-center",
          data.ownEvent ? "bg-primary" : "bg-green-700",
        )}
      >
        <span className="text-2xl leading-none font-bold">
          {start.toLocaleString("en-GB", {
            timeZone: "Europe/Oslo",
            day: "numeric",
          })}
        </span>
        <span className="leading-none">
          {start.toLocaleString("nb", {
            timeZone: "Europe/Oslo",
            month: "short",
          })}
        </span>
      </div>
      <div>
        <h2 className="text-xl leading-tight font-semibold">
          {data.relatedPost ? (
            <Link
              href={resolveHref(data.relatedPost._type, data.relatedPost.slug)!}
              className=" underline hover:text-primary"
              title={data.relatedPost.title}
            >
              {data.title}
            </Link>
          ) : (
            data.title
          )}
        </h2>
        <div className="mb-2 flex flex-col">
          <p>
            {[
              formatDate({
                date: data.duration.start,
                endDate: data.duration.end,
                options: hideTime ? {} : { hour: "numeric", minute: "2-digit" },
              }),
              data.location?.name,
            ]
              .filter(Boolean)
              .join(", ")}
          </p>
          {data.location?.address && (
            <address className="not-italic">{data.location?.address}</address>
          )}
        </div>
        <p className="text-muted-foreground">{data.description}</p>
        {(registrationDueDate || data.registrationUrl) && (
          <p className="text-muted-foreground text-sm mt-3 flex flex-wrap gap-x-4 gap-y-2 items-center">
            {!isPastRegistrationDate && data.registrationUrl && (
              <Button size="sm" asChild>
                <a href={data.registrationUrl}>
                  <ArrowRightIcon className="-ml-1 mr-1" /> Meld deg på
                </a>
              </Button>
            )}
            {registrationDueDate &&
              `Påmeldingsfrist: ${formatDate({ date: data.registrationDueDate })}`}
          </p>
        )}
      </div>
    </div>
  );
}
