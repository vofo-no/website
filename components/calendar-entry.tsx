import Link from "next/link";
import { CalendarEntryPayload } from "@/types";

import { formatDate } from "@/lib/date";
import { resolveHref } from "@/lib/resolveHref";
import { cn } from "@/lib/utils";

interface CalendarEntryProps {
  data: CalendarEntryPayload;
}

export function CalendarEntry({ data }: CalendarEntryProps) {
  const start = new Date(data.duration.start);
  const hideTime =
    (data.duration.end &&
      data.duration.end.split("T")[0] !== data.duration.start.split("T")[0]) ||
    start.getHours() === 0;
  return (
    <div className="flex gap-3 justify-start">
      <div
        className={cn(
          "w-12 h-14 shrink-0 text-white flex flex-col items-center justify-center",
          data.ownEvent ? "bg-primary" : "bg-green-700",
        )}
      >
        <span className="text-2xl leading-none font-bold">
          {start.getDate()}
        </span>
        <span className="leading-none">
          {start.toLocaleString("nb-NO", { month: "short" })}
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
      </div>
    </div>
  );
}
