import { getPersonById } from "lib/sanity.fetch";

import PersonLayout from "./PersonLayout";

interface PersonProps {
  title?: string;
  id: string;
  compact?: boolean;
  showContactInfo?: boolean;
}

export default async function Person({ id, ...props }: PersonProps) {
  const data = await getPersonById(id);

  if (!data) return null;

  return <PersonLayout data={data} {...props} />;
}
