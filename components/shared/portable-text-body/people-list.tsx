import { PersonPayload } from "@/types";
import { PortableTextTypeComponentProps } from "@portabletext/react";

import { PersonLayout } from "../person/layout";

interface PeopleDef {
  _type: "organizations";
  members: PersonPayload[];
}

export function PeopleList(props: PortableTextTypeComponentProps<PeopleDef>) {
  return (
    <ol>
      {props.value.members.map((person) => (
        <PersonLayout
          key={["peoplelist", props.index, person._id].join(".")}
          data={person}
        />
      ))}
    </ol>
  );
}
