import { Metadata } from "next";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { postBySlugQuery } from "@/sanity/lib/queries";
import { loadQuery } from "@/sanity/loader/loadQuery";
import { PostPayload } from "@/types";

import { PostPageLayout } from "@/components/pages/post-page";

const PostPagePreview = dynamic(() => import("./preview"));

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params: { slug },
}: PostPageProps): Promise<Metadata> {
  const { data } = await loadQuery<PostPayload>(postBySlugQuery, {
    slug,
  });

  if (!data) notFound();

  return {
    title: data.title,
    description: data.description,
  };
}

export default async function PostPage({ params: { slug } }: PostPageProps) {
  const initial = await loadQuery<PostPayload>(postBySlugQuery, {
    slug,
  });

  if (draftMode().isEnabled)
    return <PostPagePreview initial={initial} slug={slug} />;

  return <PostPageLayout data={initial.data} />;
}
