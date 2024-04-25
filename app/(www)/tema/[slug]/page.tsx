import { Metadata } from "next";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { loadTopic } from "@/sanity/loader/loadQuery";

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

  return {
    title: data.title,
    description: data.description,
  };
}

export default async function TopicPage({ params: { slug } }: TopicPageProps) {
  const initial = await loadTopic(slug);

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
