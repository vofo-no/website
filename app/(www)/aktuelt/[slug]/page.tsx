import { Metadata } from "next";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { loadPost } from "@/sanity/loader/loadQuery";

import { PostPageLayout } from "@/components/pages/post-page";
import { TagLink } from "@/components/shared/tag-link";

const PostPagePreview = dynamic(() => import("./preview"));

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params: { slug },
}: PostPageProps): Promise<Metadata> {
  const { data } = await loadPost(slug);

  if (!data) notFound();

  return {
    title: data.title,
    description: data.description,
  };
}

export default async function PostPage({ params: { slug } }: PostPageProps) {
  const initial = await loadPost(slug);

  const relevance = initial.data.relevance?.map((tag) => (
    <TagLink id={tag._ref} size="lg" key={`taglink.${tag._ref}`} />
  ));

  if (draftMode().isEnabled)
    return (
      <PostPagePreview initial={initial} slug={slug} relevance={relevance} />
    );

  return <PostPageLayout data={initial.data} relevance={relevance} />;
}
