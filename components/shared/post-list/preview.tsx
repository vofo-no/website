"use client";

import { postsByReferenceQuery } from "@/sanity/lib/queries";
import { useQuery } from "@/sanity/loader/useQuery";
import { PostListItemPayload } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";

import { PostListLayout } from "./layout";

interface Props
  extends Omit<React.ComponentProps<typeof PostListLayout>, "data"> {
  initial: QueryResponseInitial<PostListItemPayload[]>;
}

export default function PostListPreview({ initial, ...rest }: Props) {
  const { data } = useQuery<PostListItemPayload[]>(
    postsByReferenceQuery,
    { ref: rest.referencesId ?? null },
    { initial },
  );

  return <PostListLayout data={data} {...rest} />;
}
