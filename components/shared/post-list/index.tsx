import { loadPostList } from "@/sanity/loader/loadQuery";

import { PostListLayout } from "./layout";
import { PostListProps } from "./types";

export async function PostList(props: PostListProps) {
  const data = await loadPostList(props.referencesId, props.searchParams);

  return (
    <>
      <PostListLayout data={data} {...props} />
    </>
  );
}
