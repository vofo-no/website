import { Metadata } from "next";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { loadCounty } from "@/sanity/loader/loadQuery";

import { CountyPageLayout } from "@/components/pages/county-page";
import { Person } from "@/components/shared/person";
import { PostList } from "@/components/shared/post-list";

const CountyPagePreview = dynamic(() => import("./preview"));

interface CountyPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params: { slug },
}: CountyPageProps): Promise<Metadata> {
  const { data } = await loadCounty(slug);

  if (!data) notFound();

  return {
    title: data.title,
    description: data.description,
  };
}

export default async function CountyPage({
  params: { slug },
}: CountyPageProps) {
  const initial = await loadCounty(slug);

  const contacts = initial.data.contacts?.map((reference) => (
    <Person key={`contactperson.${reference._ref}`} id={reference._ref} />
  ));

  const archiveParams = new URLSearchParams({ fylke: slug });

  if (draftMode().isEnabled)
    return (
      <CountyPagePreview initial={initial} slug={slug} contacts={contacts}>
        <PostList
          referencesId={initial.data._id}
          title={`Aktuelt fra ${initial.data.title}`}
          archiveParams={archiveParams}
        />
      </CountyPagePreview>
    );

  return (
    <CountyPageLayout data={initial.data} contacts={contacts}>
      <PostList
        referencesId={initial.data._id}
        title={`Aktuelt fra ${initial.data.title}`}
        archiveParams={archiveParams}
      />
    </CountyPageLayout>
  );
}
