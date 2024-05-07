import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { urlForImage } from "@/sanity/lib/image";
import { loadTopic } from "@/sanity/loader/loadQuery";

import { resolveHref } from "@/lib/resolveHref";
import { PageLayout } from "@/components/pages/page-layout";
import { Person } from "@/components/shared/person";
import { PostList } from "@/components/shared/post-list";

interface TopicPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params: { slug } }: TopicPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const data = await loadTopic(slug);

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
      type: "website",
      url: `https://www.vofo.no${resolveHref("topic", slug)}`,
    },
  };
}

// Waiting for https://github.com/vercel/next.js/issues/59883
export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
  /*  const data = await client.fetch<{ slug: string }[]>(
    groq`*[_type == "topic"][] { "slug": slug.current }`,
    {},
    { next: { tags: ["topic"] } },
  );

  return data.map((item) => ({
    slug: item.slug,
  }));*/
}

export default async function TopicPage({ params: { slug } }: TopicPageProps) {
  const data = await loadTopic(slug);

  if (!data) notFound();

  const contacts = data.contacts?.map((reference) => (
    <Person key={`contactperson.${reference._ref}`} id={reference._ref} />
  ));

  const archiveParams = new URLSearchParams({ tema: slug });

  return (
    <PageLayout data={data} contacts={contacts}>
      <PostList
        referencesId={data._id}
        title={`Aktuelt om ${data.title.toLocaleLowerCase()}`}
        archiveParams={archiveParams}
      />
    </PageLayout>
  );
}
