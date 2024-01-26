import { Metadata } from "next";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { topicBySlugQuery } from "@/sanity/lib/queries";
import { loadQuery } from "@/sanity/loader/loadQuery";
import { TopicPayload } from "@/types";

import { CountyPageLayout } from "@/components/pages/county-page";
import { Person } from "@/components/shared/person";
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
  const { data } = await loadQuery<TopicPayload>(topicBySlugQuery, {
    slug,
  });

  return {
    title: data.title,
    description: data.description,
  };
}

export default async function TopicPage({ params: { slug } }: TopicPageProps) {
  const initial = await loadQuery<TopicPayload>(topicBySlugQuery, {
    slug,
  });

  const contacts = initial.data.contacts?.map((reference) => (
    <Person key={`contactperson.${reference._ref}`} id={reference._ref} />
  ));

  if (draftMode().isEnabled)
    return (
      <TopicPagePreview initial={initial} slug={slug} contacts={contacts}>
        <PostList
          referencesId={initial.data._id}
          title={`Aktuelt om ${initial.data.title.toLocaleLowerCase()}`}
        />
      </TopicPagePreview>
    );

  return (
    <CountyPageLayout data={initial.data} contacts={contacts}>
      <PostList
        referencesId={initial.data._id}
        title={`Aktuelt om ${initial.data.title.toLocaleLowerCase()}`}
      />
    </CountyPageLayout>
  );
}
