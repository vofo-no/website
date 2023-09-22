import { getPersonById } from "lib/sanity.fetch";

import PersonLayout from "./PersonLayout";

interface PersonProps {
  title?: string;
  id: string;
}

export default async function Person({ id, title }: PersonProps) {
  const data = await getPersonById(id);

  if (!data) return null;

  return <PersonLayout data={data} title={title} />;
}
