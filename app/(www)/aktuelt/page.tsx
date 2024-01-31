import { Metadata } from "next";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { searchPostsQuery } from "@/sanity/lib/queries";
import {
  loadAllCounties,
  loadAllTopics,
  loadQuery,
} from "@/sanity/loader/loadQuery";
import { PostListItemPayload } from "@/types";

import { PostsIndexPageLayout } from "@/components/pages/post-index";

import { parseSearch } from "./parse-search";

const PostsIndexPagePreview = dynamic(() => import("./preview"));

export const metadata: Metadata = { title: "Dokument- og nyhetsarkiv" };

export default async function PostsIndexPage({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const [counties, topics] = await Promise.all([
    loadAllCounties(),
    loadAllTopics(),
  ]);

  const initial = await loadQuery<PostListItemPayload[]>(
    searchPostsQuery,
    parseSearch(
      new URLSearchParams(
        Object.keys(searchParams)
          .map((key) => {
            const value = searchParams[key];

            if (typeof value === "undefined") return undefined;
            return [key, typeof value === "string" ? value : value[0]];
          })
          .filter(Boolean) as string[][],
      ),
      counties.data,
      topics.data,
    ),
    { next: { tags: [`post`, `county`, `topic`] } },
  );

  if (draftMode().isEnabled)
    return (
      <PostsIndexPagePreview
        initial={initial}
        counties={counties.data}
        topics={topics.data}
      />
    );

  return (
    <PostsIndexPageLayout
      data={initial.data}
      counties={counties.data.map(({ title, slug }) => ({
        title,
        value: slug,
      }))}
      topics={topics.data.map(({ title, slug }) => ({ title, value: slug }))}
    />
  );
}
