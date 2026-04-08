import { Suspense } from "react";

import { Person } from "../person";
import { PersonLayout } from "../person/layout";
import { PeopleListType } from "./types";

export const PeopleList: PeopleListType = (props) => {
  const { showDescription } = props.value;

  return props.value.members.map(({ person }) => (
    <Suspense
      fallback={<PersonLayout loading />}
      key={["peoplelist", props.index, person._ref].join(".")}
    >
      <Person id={person._ref} showDescription={!!showDescription} />
    </Suspense>
  ));
};
