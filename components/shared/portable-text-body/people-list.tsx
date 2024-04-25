import { Suspense } from "react";

import { Person } from "../person";
import { PersonLayout } from "../person/layout";
import { PeopleListType } from "./types";

export const PeopleList: PeopleListType = (props) => {
  return props.value.members.map(({ person }) => (
    <Suspense
      fallback={<PersonLayout loading />}
      key={["peoplelist", props.index, person._ref].join(".")}
    >
      <Person id={person._ref} />
    </Suspense>
  ));
};
