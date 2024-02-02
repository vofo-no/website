import { Metadata } from "next";
import { loadAllCounties, loadAllTopics } from "@/sanity/loader/loadQuery";

import { parseSearch } from "@/lib/parse-search";
import { PostsIndexPageLayout } from "@/components/pages/post-index";
import { PostList } from "@/components/shared/post-list";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Dokument- og nyhetsarkiv" };

export default async function PostsIndexPage(props: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const [counties, topics] = await Promise.all([
    loadAllCounties(),
    loadAllTopics(),
  ]);

  const searchParams = parseSearch(
    new URLSearchParams(
      Object.keys(props.searchParams)
        .map((key) => {
          const value = props.searchParams[key];

          if (typeof value === "undefined") return undefined;
          return [key, typeof value === "string" ? value : value[0]];
        })
        .filter(Boolean) as string[][],
    ),
    counties.data,
    topics.data,
  );

  return (
    <PostsIndexPageLayout
      counties={counties.data.map(({ title, slug }) => ({
        title,
        value: slug,
      }))}
      topics={topics.data.map(({ title, slug }) => ({ title, value: slug }))}
    >
      <PostList searchParams={searchParams} />
    </PostsIndexPageLayout>
  );
}
