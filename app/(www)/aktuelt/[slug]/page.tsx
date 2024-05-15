import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { loadPost } from "@/sanity/loader/loadQuery";
import { groq } from "next-sanity";

import { resolveHref } from "@/lib/resolveHref";
import { PostPageLayout } from "@/components/pages/post-page";
import { TagLink } from "@/components/shared/tag-link";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params: { slug } }: PostPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const data = await loadPost(slug);

  if (!data) notFound();

  const previousImages = (await parent).openGraph?.images || [];
  const image = data.image && {
    url: urlForImage(data.image).size(1200, 630).url(),
    width: 1200,
    height: 630,
    alt: data.image.alt,
  };

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      images: image ? [image, ...previousImages] : previousImages,
      title: data.title,
      type: "article",
      publishedTime: data.publishedAt,
      modifiedTime: data._updatedAt,
      url: `https://www.vofo.no${resolveHref("post", slug)}`,
    },
  };
}

export async function generateStaticParams() {
  const data = await client.fetch<{ slug: string }[]>(
    groq`*[_type == "post"][] { "slug": slug.current }`,
    {},
    { next: { tags: ["post"] } },
  );

  return data.map((item) => ({
    slug: item.slug,
  }));
}

export default async function PostPage({ params: { slug } }: PostPageProps) {
  const data = await loadPost(slug);

  if (!data) notFound();

  const relevance = data.relevance?.map((tag) => (
    <TagLink id={tag._ref} size="lg" key={`taglink.${tag._ref}`} />
  ));

  return <PostPageLayout data={data} relevance={relevance} />;
}
