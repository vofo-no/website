import { Suspense } from "react";
import { PersonItem } from "types";

import Person from "./Person";
import PersonLoading from "./Person/loading";

export interface PeopleProps {
  title?: string;
  members: PersonItem[];
}

export default function People({ title, members }: PeopleProps) {
  return (
    <div title={title} className="grid grid-cols-1 gap-4 my-5">
      {members.map(({ person, title }) => (
        <Suspense key={person._ref} fallback={<PersonLoading />}>
          <Person id={person._ref} title={title} />
        </Suspense>
      ))}
    </div>
  );
}
