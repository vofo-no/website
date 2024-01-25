"use client";

import { documentLinkByIdQuery } from "@/sanity/lib/queries";
import { useQuery } from "@/sanity/loader/useQuery";
import { DocumentLinkPayload } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";

import { DocumentLinkLayout } from "./layout";

type Props = {
  id: string;
  initial: QueryResponseInitial<DocumentLinkPayload>;
};

export default function PersonPreview({ id, initial }: Props) {
  const { data } = useQuery<DocumentLinkPayload>(
    documentLinkByIdQuery,
    { id },
    { initial },
  );

  return <DocumentLinkLayout data={data} />;
}
