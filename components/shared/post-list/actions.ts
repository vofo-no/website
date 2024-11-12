"use server";

import { loadPostList } from "@/sanity/loader/loadQuery";

export async function loadPostListAction(
  ...args: Parameters<typeof loadPostList>
) {
  return loadPostList(...args);
}
