import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { homeQuery } from "@/sanity/lib/queries";
import { loadQuery } from "@/sanity/loader/loadQuery";
import { HomePayload } from "@/types";

import { PostList } from "@/components/shared/post-list";

import { HomePageLayout } from "../../components/pages/home-page";

const HomePagePreview = dynamic(() => import("./preview"));

export default async function HomePage() {
  const initial = await loadQuery<HomePayload>(
    homeQuery,
    {},
    { next: { tags: ["home"] } },
  );

  if (draftMode().isEnabled) {
    return (
      <HomePagePreview initial={initial}>
        <PostList />
      </HomePagePreview>
    );
  }

  return (
    <HomePageLayout data={initial.data}>
      <PostList />
    </HomePageLayout>
  );
}
