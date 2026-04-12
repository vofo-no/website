import { Metadata } from "next";
import { loadAllCounties, loadAllTopics } from "@/sanity/loader/loadQuery";

import { parseSearch } from "@/lib/parse-search";
import { PostsIndexPageLayout } from "@/components/pages/post-index";
import { PostList } from "@/components/shared/post-list";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Dokument- og nyhetsarkiv" };

export default async function PostsIndexPage(props: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const [{ data: counties }, { data: topics }] = await Promise.all([
    loadAllCounties(),
    loadAllTopics(),
  ]);

  const serverSearchParams = await props.searchParams;

  const searchParams = parseSearch(
    new URLSearchParams(
      Object.keys(serverSearchParams)
        .map((key) => {
          const value = serverSearchParams[key];

          if (typeof value === "undefined") return undefined;
          return [key, typeof value === "string" ? value : value[0]];
        })
        .filter(Boolean) as string[][],
    ),
    [...counties, ...topics],
  );

  return (
    <PostsIndexPageLayout
      counties={counties.map(({ title, slug }) => ({
        title: title || "",
        value: slug || "",
      }))}
      topics={topics.map(({ title, slug }) => ({
        title: title || "",
        value: slug || "",
      }))}
    >
      <PostList searchParams={searchParams} dynamic />
    </PostsIndexPageLayout>
  );
}
