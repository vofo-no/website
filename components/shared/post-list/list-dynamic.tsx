"use client";

import { useEffect, useState } from "react";
import { PostListItemPayload } from "@/types";

import { Button } from "@/components/ui/button";

import { loadPostListAction } from "./actions";
import { PostListStatic } from "./list-static";
import { PostListProps } from "./types";

interface PostListDynamicProps
  extends Pick<PostListProps, "referencesId" | "searchParams"> {
  initialData: PostListItemPayload[];
}

const BATCH_SIZE = 30;

export function PostListDynamic({
  initialData,
  referencesId,
  searchParams,
}: PostListDynamicProps) {
  const [data, setData] = useState(initialData);
  const [hasMore, setHasMore] = useState(initialData.length === BATCH_SIZE);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData(initialData);
    setHasMore(initialData.length === BATCH_SIZE);
    setLoading(false);
  }, [initialData]);

  const loadMorePosts = async () => {
    setLoading(true);
    const nextPosts = await loadPostListAction(
      referencesId,
      searchParams,
      data[data.length - 1],
    );
    setData([...data, ...nextPosts]);
    setHasMore(nextPosts.length === BATCH_SIZE);
    setLoading(false);
  };

  return (
    <>
      <PostListStatic data={data} referencesId={referencesId} />
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            variant="outline"
            disabled={loading}
            className={loading ? "animate-pulse" : ""}
            onClick={loadMorePosts}
          >
            Vis flere saker
          </Button>
        </div>
      )}
    </>
  );
}
