import dynamic from "next/dynamic";

import { PeopleListType } from "./types";

const PersonPreview = dynamic(
  () => import("@/components/shared/person/preview"),
);

export const PeopleListPreview: PeopleListType = (props) => {
  return props.value.members.map(({ person }) => (
    <PersonPreview
      key={["peoplelist", props.index, person._ref].join(".")}
      id={person._ref}
      initial={{
        data: { _id: person._ref, name: "..." },
        sourceMap: undefined,
      }}
    />
  ));
};
