import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { personByIdQuery } from "@/sanity/lib/queries";
import { loadQuery } from "@/sanity/loader/loadQuery";
import { PersonPayload } from "@/types";

import { PersonLayout } from "./layout";

const PersonPreview = dynamic(() => import("./preview"));

export interface PersonProps {
  id: string;
}

export async function Person({ id }: PersonProps) {
  const initial = await loadQuery<PersonPayload>(
    personByIdQuery,
    { id },
    { next: { tags: [`person:${id}`] } },
  );

  if (draftMode().isEnabled) return <PersonPreview id={id} initial={initial} />;

  return <PersonLayout data={initial.data} />;
}
