import { loadPostList } from "@/sanity/loader/loadQuery";

import { PostListLayout } from "./layout";

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
  const data = await loadPostList(props.referencesId, props.searchParams);

  return (
    <PostListLayout
      title={props.title}
      data={data}
      referencesId={props.referencesId}
      archiveParams={props.archiveParams}
    />
  );
}
