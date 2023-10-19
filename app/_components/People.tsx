import { Suspense } from "react";
import { PersonItem } from "types";

import Person from "./Person";
import PersonLoading from "./Person/loading";

export interface PeopleProps {
  members: PersonItem[];
  showContactInfo?: boolean;
}

export default function People({ members, showContactInfo }: PeopleProps) {
  return (
    <div className="grid grid-cols-1">
      {members.map(({ person, title }) => (
        <Suspense key={person._ref} fallback={<PersonLoading />}>
          <Person
            id={person._ref}
            title={title}
            compact
            showContactInfo={showContactInfo}
          />
        </Suspense>
      ))}
    </div>
  );
}
