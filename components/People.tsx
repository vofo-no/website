import { PersonItem } from "types";

import ContactPerson from "./ContactPerson";

export interface PeopleProps {
  title?: string;
  members: PersonItem[];
}

export default function People({ title, members }: PeopleProps) {
  return (
    <div title={title}>
      {members.map(({ person, title }) => (
        <ContactPerson
          image={person.image}
          name={person.name}
          title={title || person.title}
          key={person._id}
          email={person.email}
          phone={person.phone}
        />
      ))}
    </div>
  );
}
