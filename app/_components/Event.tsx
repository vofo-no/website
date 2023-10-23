import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import eventTimeDisplay from "lib/eventTimeDisplay";
import { getEventById } from "lib/sanity.fetch";
import { Suspense } from "react";

interface Props {
  id?: string;
}

export default async function Event(props: Props) {
  return (
    <Suspense key={props.id} fallback={<EventLayout />}>
      <EventLayout {...props} />
    </Suspense>
  );
}

async function EventLayout({ id }: Props) {
  const data = id ? await getEventById(id) : null;

  return (
    <div className="flex gap-4 -mx-4 p-4 my-6 first:mt-0 items-start bg-green-100 border-l-4 border-l-green-600">
      <CalendarDaysIcon className="text-green-600 w-40" />
      <div
        className={classNames("flex flex-col", {
          "animate-pulse": !data,
        })}
      >
        <div className="font-roboto text-lg font-medium leading-tight">
          {data ? (
            data.title
          ) : (
            <span className="w-36 inline-block bg-gray-300 h-4 rounded-md "></span>
          )}
        </div>
        <div className="text-gray-500 text-sm my-1 flex flex-wrap gap-1 gap-x-3">
          <span>
            {data?.duration &&
              data.duration.start &&
              data.duration.end &&
              eventTimeDisplay(data.duration.start, data.duration.end)}
          </span>
          <span>{data?.location?.name}</span>
        </div>
        <div className="text-gray-500 text-sm">{data?.description}</div>
      </div>
    </div>
  );
}
