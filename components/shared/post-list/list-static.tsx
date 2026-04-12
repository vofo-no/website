import {
  PostsByReferenceQueryResult,
  SearchPostsQueryResult,
} from "@/sanity.types";

import { PostListItem } from "@/components/post-list-item";

import { PostListEmpty } from "./empty";

interface PostListStaticProps {
  referencesId?: string;
  data: SearchPostsQueryResult | PostsByReferenceQueryResult;
}

export function PostListStatic(props: PostListStaticProps) {
  if (!props.data.length) {
    return <PostListEmpty />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-8">
      {props.data.map((item, index) => (
        <PostListItem
          key={item._id}
          item={item}
          referencesId={props.referencesId}
          priority={index < 3}
        />
      ))}
    </div>
  );
}
