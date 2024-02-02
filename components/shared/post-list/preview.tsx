"use client";

import { postsByReferenceQuery, searchPostsQuery } from "@/sanity/lib/queries";
import { useQuery } from "@/sanity/loader/useQuery";
import { PostListItemPayload } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";

import { PostListLayout } from "./layout";

interface Props
  extends Omit<React.ComponentProps<typeof PostListLayout>, "data"> {
  initial: QueryResponseInitial<PostListItemPayload[]>;
  searchParams?: {
    docTypes: string[] | null;
    q: string | null;
    refs: string[] | null;
    years: string[] | null;
  };
}

export default function PostListPreview({
  initial,
  searchParams,
  ...rest
}: Props) {
  const { data } = useQuery<PostListItemPayload[]>(
    searchParams ? searchPostsQuery : postsByReferenceQuery,
    searchParams || { ref: rest.referencesId ?? null },
    { initial },
  );

  return <PostListLayout data={data} {...rest} />;
}
