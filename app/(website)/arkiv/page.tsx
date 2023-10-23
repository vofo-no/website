import Container from "components/Container";
import { newsDocTypes } from "lib/docTypeDisplay";
import { getAllActiveCounties, getAllTopics } from "lib/sanity.fetch";
import { Metadata } from "next";
import React from "react";

import SearchBox from "./SearchBox";
import Select from "./Select";

export const metadata: Metadata = {
  title: "Dokument- og nyhetsarkiv",
};

const FIRST_YEAR = 2022;

function yearRange() {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - FIRST_YEAR + 1 }, (_, i) =>
    String(currentYear - i)
  );
}

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const years = yearRange();
  const [topics, counties] = await Promise.all([
    getAllTopics().then((data) =>
      data.map((topic) => ({
        value: topic.slug,
        title: topic.title,
        _id: topic._id,
      }))
    ),
    getAllActiveCounties().then((data) =>
      data.map((county) => ({
        value: county.slug,
        title: county.name,
        _id: county._id,
      }))
    ),
  ]);

  return (
    <>
      <Container prose>
        <h1>Dokument- og nyhetsarkiv</h1>
        <p className="lead max-w-prose">
          I arkivet finner du dokumenter og nyhetssaker vi har lagt ut
          tidligere.
        </p>
      </Container>
      <Container paper prose>
        <div>
          <SearchBox
            name="q"
            value={searchParams.q}
            label="Søk etter dokumenter og saker"
          />
          <div className="flex flex-wrap gap-2">
            <Select
              name="type"
              value={searchParams.type || ""}
              options={newsDocTypes}
              label="Innholdstype"
            />
            <Select
              name="fylke"
              value={searchParams.fylke || ""}
              options={counties}
              label="Fylke"
            />
            <Select
              name="tema"
              value={searchParams.tema || ""}
              options={topics}
              label="Tema"
            />
            <Select
              name="tid"
              value={searchParams.tid || ""}
              options={years}
              label="Tidsperiode"
            />
          </div>
        </div>
        <p>{JSON.stringify(searchParams)}</p>
      </Container>
    </>
  );
}
