import { Metadata } from "next";
import { loadHome } from "@/sanity/loader/loadQuery";

import { PostList } from "@/components/shared/post-list";

import { HomePageLayout } from "../../components/pages/home-page";

export async function generateMetadata(): Promise<Metadata> {
  const data = await loadHome();

  return {
    description: data.description,
  };
}

export default async function HomePage() {
  const data = await loadHome();

  const archiveParams = new URLSearchParams({});

  return (
    <HomePageLayout data={data}>
      <PostList archiveParams={archiveParams} />
    </HomePageLayout>
  );
}
