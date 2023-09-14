/*import React from "react";
import { CalendarItemType } from "../lib/sanity.api";
import CalendarItem from "./CalendarListItem";

interface CalendarListProps {
  items: Array<CalendarItemType>;
}

export default function CalendarList({ items = [] }: CalendarListProps) {
  if (items.length === 0) {
    return <p className="text-lg py-4 text-gray-500">Ingen arrangementer</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-6 my-8">
      {items.map((item) => (
        <CalendarItem {...item} key={item._id} />
      ))}
    </div>
  );
}
*/
