"use client";

import { postsByReferenceQuery } from "@/sanity/lib/queries";
import { useQuery } from "@/sanity/loader/useQuery";
import { PostListItemPayload } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";

import { PostListLayout } from "./layout";

type Props = {
  referencesId?: string;
  initial: QueryResponseInitial<PostListItemPayload[]>;
};

export default function PostListPreview(props: Props) {
  const { data } = useQuery<PostListItemPayload[]>(
    postsByReferenceQuery,
    { ref: props.referencesId ?? null },
    { initial: props.initial },
  );

  return <PostListLayout data={data} referencesId={props.referencesId} />;
}
