import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { postsByReferenceQuery, searchPostsQuery } from "@/sanity/lib/queries";
import { loadQuery } from "@/sanity/loader/loadQuery";
import { PostListItemPayload } from "@/types";

import { PostListLayout } from "./layout";

const PostListPreview = dynamic(() => import("./preview"));

export interface PostListProps {
  referencesId?: string;
  searchParams?: {
    docTypes: string[] | null;
    q: string | null;
    refs: string[] | null;
    years: string[] | null;
  };
  title?: string;
  archiveParams?: URLSearchParams;
}

export async function PostList(props: PostListProps) {
  const initial = await loadQuery<PostListItemPayload[]>(
    props.searchParams ? searchPostsQuery : postsByReferenceQuery,
    props.searchParams || { ref: props.referencesId ?? null },
    { next: { tags: ["post", "county", "topic"] } },
  );

  if (draftMode().isEnabled)
    return (
      <PostListPreview
        referencesId={props.referencesId}
        initial={initial}
        title={props.title}
        archiveParams={props.archiveParams}
      />
    );

  return (
    <PostListLayout
      title={props.title}
      data={initial.data}
      referencesId={props.referencesId}
      archiveParams={props.archiveParams}
    />
  );
}
