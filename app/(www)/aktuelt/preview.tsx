"use client";

import { useSearchParams } from "next/navigation";
import { searchPostsQuery } from "@/sanity/lib/queries";
import { useQuery } from "@/sanity/loader/useQuery";
import {
  CountyListItemPayload,
  PostListItemPayload,
  TopicListItemPayload,
} from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";

import { PostsIndexPageLayout } from "@/components/pages/post-index";

import { parseSearch } from "./parse-search";

type Props = {
  initial: QueryResponseInitial<PostListItemPayload[]>;
  counties: CountyListItemPayload[];
  topics: TopicListItemPayload[];
};

export default function PostsIndexPagePreview({
  initial,
  counties,
  topics,
}: Props) {
  const searchParams = useSearchParams();

  const { data } = useQuery<PostListItemPayload[]>(
    searchPostsQuery,
    parseSearch(searchParams, counties, topics),
    { initial },
  );

  return (
    <PostsIndexPageLayout
      data={data}
      topics={topics.map(({ title, slug }) => ({ title, value: slug }))}
      counties={counties.map(({ title, slug }) => ({ title, value: slug }))}
    />
  );
}
