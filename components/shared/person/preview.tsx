"use client";

import { personByIdQuery } from "@/sanity/lib/queries";
import { useQuery } from "@/sanity/loader/useQuery";
import { PersonPayload } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";

import { PersonLayout } from "./layout";

type Props = {
  id: string;
  initial: QueryResponseInitial<PersonPayload>;
};

export default function PersonPreview({ id, initial }: Props) {
  const { data } = useQuery<PersonPayload>(
    personByIdQuery,
    { id },
    { initial },
  );

  return <PersonLayout data={data} />;
}
