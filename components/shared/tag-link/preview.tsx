"use client";

import { tagByIdQuery } from "@/sanity/lib/queries";
import { useQuery } from "@/sanity/loader/useQuery";
import { DocumentLinkPayload } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";

import { TagLinkLayout } from "./layout";

interface Props
  extends Pick<React.ComponentProps<typeof TagLinkLayout>, "size"> {
  id: string;
  initial?: QueryResponseInitial<DocumentLinkPayload>;
}

export default function TagLinkPreview({ id, initial, ...rest }: Props) {
  const { data } = useQuery<DocumentLinkPayload>(
    tagByIdQuery,
    { id },
    {
      initial: initial || {
        data: { _type: "page", slug: "/", title: "..." },
        sourceMap: undefined,
      },
    },
  );

  return <TagLinkLayout data={data} {...rest} />;
}
