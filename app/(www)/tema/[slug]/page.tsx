import { Metadata } from "next";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { loadTopic } from "@/sanity/loader/loadQuery";
import { groq } from "next-sanity";

import { PageLayout } from "@/components/pages/page-layout";
import { Person } from "@/components/shared/person";
import { portableTextBodyTypeComponentsRSC } from "@/components/shared/portable-text-body/type-components";
import { PostList } from "@/components/shared/post-list";

const TopicPagePreview = dynamic(() => import("./preview"));

interface TopicPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params: { slug },
}: TopicPageProps): Promise<Metadata> {
  const { data } = await loadTopic(slug);

  if (!data) notFound();

  const image = data.image && urlForImage(data.image).size(1200, 630).url();

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      images: image,
    },
  };
}

export async function generateStaticParams() {
  const data = await client.fetch<{ slug: string }[]>(
    groq`*[_type == "topic"][] { "slug": slug.current }`,
    {},
    { next: { tags: ["topic"] } },
  );

  return data.map((item) => ({
    slug: item.slug,
  }));
}

export default async function TopicPage({ params: { slug } }: TopicPageProps) {
  const initial = await loadTopic(slug);

  if (!initial.data) notFound();

  const contacts = initial.data.contacts?.map((reference) => (
    <Person key={`contactperson.${reference._ref}`} id={reference._ref} />
  ));

  const archiveParams = new URLSearchParams({ tema: slug });

  if (draftMode().isEnabled)
    return (
      <TopicPagePreview initial={initial} slug={slug} contacts={contacts}>
        <PostList
          referencesId={initial.data._id}
          title={`Aktuelt om ${initial.data.title.toLocaleLowerCase()}`}
          archiveParams={archiveParams}
        />
      </TopicPagePreview>
    );

  return (
    <PageLayout
      data={initial.data}
      contacts={contacts}
      ptComponents={portableTextBodyTypeComponentsRSC}
    >
      <PostList
        referencesId={initial.data._id}
        title={`Aktuelt om ${initial.data.title.toLocaleLowerCase()}`}
        archiveParams={archiveParams}
      />
    </PageLayout>
  );
}
