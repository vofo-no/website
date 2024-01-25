import { Person } from "../person";
import { PeopleListType } from "./types";

export const PeopleList: PeopleListType = (props) => {
  return props.value.members.map(({ person }) => (
    <Person
      key={["peoplelist", props.index, person._ref].join(".")}
      id={person._ref}
    />
  ));
};
