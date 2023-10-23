import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import LinkToId from "app/_components/LinkToId";
import Container from "components/Container";
import eventTimeDisplay from "lib/eventTimeDisplay";
import formatTime from "lib/formatTime";
import { getAllEvents } from "lib/sanity.fetch";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Kalender",
};

function monthIfNew(oldMonth: string, newMonth: string) {
  if (newMonth > oldMonth)
    return (
      <h2 className="first:mt-0 mb-6 capitalize">
        {formatTime(`${newMonth}-01`, "MMMM yyyy")}
      </h2>
    );
  return null;
}

export default async function CalendarPage() {
  const events = await getAllEvents();
  let newMonth = "0";

  return (
    <>
      <Container prose>
        <h1>Kalender</h1>
      </Container>
      <Container paper prose>
        {events?.map((event) => {
          const oldMonth = newMonth;
          newMonth = event.duration?.start?.substring(0, 7) || oldMonth;
          return (
            <React.Fragment key={event._id}>
              {monthIfNew(oldMonth, newMonth)}
              <div className="my-6">
                <h3 className="flex items-start">
                  <CalendarDaysIcon className="text-green-600 w-12 mr-2 shrink-0" />
                  <span className="my-1">
                    <span>{event.title}</span>
                    <small className="text-gray-500 text-sm flex flex-col">
                      <span>
                        {event.duration &&
                          event.duration.start &&
                          event.duration.end &&
                          eventTimeDisplay(
                            event.duration.start,
                            event.duration.end
                          )}
                      </span>
                      <span>
                        {[event.location?.name, event.location?.address]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    </small>
                  </span>
                </h3>
                {event.description && <p>{event.description}</p>}
                {event.newsItems && event.newsItems?.length > 0 ? (
                  <ul>
                    {event.newsItems?.map((item) => (
                      <li key={item._id}>
                        <LinkToId id={item._id} />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </React.Fragment>
          );
        }) || <p className="italic">Ingen oppføringer</p>}
      </Container>
    </>
  );
}
