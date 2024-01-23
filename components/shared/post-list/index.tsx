import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { postsByReferenceQuery } from "@/sanity/lib/queries";
import { loadQuery } from "@/sanity/loader/loadQuery";
import { PostListItemPayload } from "@/types";

import { PostListLayout } from "./layout";

const PostListPreview = dynamic(() => import("./preview"));

export interface PostListProps {
  referencesId?: string;
}

export async function PostList(props: PostListProps) {
  const initial = await loadQuery<PostListItemPayload[]>(
    postsByReferenceQuery,
    { ref: props.referencesId ?? null },
    { next: { tags: ["post", "county", "topic", "project"] } },
  );

  if (draftMode().isEnabled)
    return (
      <PostListPreview referencesId={props.referencesId} initial={initial} />
    );

  return (
    <PostListLayout referencesId={props.referencesId} data={initial.data} />
  );
}
