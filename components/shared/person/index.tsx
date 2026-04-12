import { loadPerson } from "@/sanity/loader/loadQuery";

import { PersonLayout } from "./layout";

export interface PersonProps {
  id: string;
  showDescription?: boolean;
}

export async function Person({ id, ...props }: PersonProps) {
  const { data } = await loadPerson(id);

  return data ? <PersonLayout data={data} {...props} /> : null;
}
