import Container from "components/Container";
import { getAllEventsByYear } from "lib/sanity.fetch";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

import EventList from "../EventList";

const FIRST_VALID_YEAR = 2023;

interface Params {
  params: { year: string };
}

export function generateMetadata({ params }: Params): Metadata {
  return {
    title: `Kalender for ${params.year}`,
  };
}

export default async function CalendarPage({ params }: Params) {
  const yearAsNumber = Number(params.year);
  const nextYear = new Date().getFullYear() + 1;
  if (
    isNaN(yearAsNumber) ||
    yearAsNumber < FIRST_VALID_YEAR ||
    yearAsNumber > nextYear
  ) {
    notFound();
  }
  const events = await getAllEventsByYear(params.year);

  return (
    <>
      <Container prose>
        <h1>Kalender for {params.year}</h1>
      </Container>
      <Container paper prose>
        <EventList events={events} />
      </Container>
    </>
  );
}
