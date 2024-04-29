import { loadPerson } from "@/sanity/loader/loadQuery";

import { PersonLayout } from "./layout";

export interface PersonProps {
  id: string;
}

export async function Person({ id }: PersonProps) {
  const data = await loadPerson(id);

  return data ? <PersonLayout data={data} /> : null;
}
