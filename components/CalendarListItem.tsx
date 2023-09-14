/*import { CalendarItemType } from "../lib/sanity.api";
import getRoute from "../lib/getRoute";
import Link from "next/link";
import formatTime from "../lib/formatTime";
import eventTimeDisplay from "../lib/eventTimeDisplay";

export default function CalendarItem(props: CalendarItemType) {
  const { title, slug, start, end, location } = props;
  return (
    <div className="flex gap-4">
      <div className="w-10 flex flex-col items-center">
        <big className="text-4xl font-bold text-crimson-500 leading-8">
          {formatTime(start, "d.")}
        </big>
        <span className="text-lg text-crimson-500">
          {formatTime(start, "MMM")}
        </span>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1 leading-tight overflow-hidden text-ellipsis">
          <Link
            href={getRoute("event", slug)}
            className="text-blue-700 hover:underline hover:text-crimson-500"
          >
            {title}
          </Link>
        </h3>
        <p className="text-gray-500 flex text-sm flex-col font-semibold">
          <span>{eventTimeDisplay(start, end)}</span>
          <span>{location?.name}</span>
        </p>
      </div>
    </div>
  );
}
*/
