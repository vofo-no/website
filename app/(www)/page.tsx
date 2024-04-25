import { Metadata } from "next";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { homeQuery } from "@/sanity/lib/queries";
import { loadQuery } from "@/sanity/loader/loadQuery";
import { HomePayload } from "@/types";

import { PostList } from "@/components/shared/post-list";

import { HomePageLayout } from "../../components/pages/home-page";

const HomePagePreview = dynamic(() => import("./preview"));

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await loadQuery<HomePayload>(
    homeQuery,
    {},
    { next: { tags: ["home"] } },
  );

  return {
    description: data.description,
  };
}

export default async function HomePage() {
  const initial = await loadQuery<HomePayload>(
    homeQuery,
    {},
    { next: { tags: ["home"] } },
  );

  const archiveParams = new URLSearchParams({});

  if (draftMode().isEnabled) {
    return (
      <HomePagePreview initial={initial}>
        <PostList archiveParams={archiveParams} />
      </HomePagePreview>
    );
  }

  return (
    <HomePageLayout data={initial.data}>
      <PostList archiveParams={archiveParams} />
    </HomePageLayout>
  );
}
