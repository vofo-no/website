import Container from "components/Container";
import { getAllEvents } from "lib/sanity.fetch";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

import EventList from "./EventList";

export const metadata: Metadata = {
  title: "Kalender",
};

export default async function CalendarPage() {
  const events = await getAllEvents();

  const firstYear = 2023;
  const nextYear = new Date().getFullYear() + 1;

  const years = [];

  for (let y = nextYear; y >= firstYear; y--) {
    years.push(y);
  }

  return (
    <>
      <Container prose>
        <h1>Kalender</h1>
        <p className="lead max-w-prose">
          Kalenderen viser arrangementer som vi er involvert i over hele landet.
        </p>
      </Container>
      <Container paper prose>
        <EventList events={events} />
        <hr />
        <h2>Kalendere for hele året</h2>
        <ul>
          {years.map((year) => (
            <li key={`archive-kalender-${year}`}>
              <Link href={`/kalender/${year}`}>Kalender for {year}</Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
