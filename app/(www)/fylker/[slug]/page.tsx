import { Metadata } from "next";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { countyBySlugQuery } from "@/sanity/lib/queries";
import { loadQuery } from "@/sanity/loader/loadQuery";
import { CountyPayload } from "@/types";

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
  const { data } = await loadQuery<CountyPayload>(countyBySlugQuery, {
    slug,
  });

  return {
    title: data.title,
    description: data.description,
  };
}

export default async function CountyPage({
  params: { slug },
}: CountyPageProps) {
  const initial = await loadQuery<CountyPayload>(countyBySlugQuery, {
    slug,
  });

  const contacts = initial.data.contacts?.map((reference) => (
    <Person key={`contactperson.${reference._ref}`} id={reference._ref} />
  ));

  if (draftMode().isEnabled)
    return (
      <CountyPagePreview initial={initial} slug={slug} contacts={contacts}>
        <PostList referencesId={initial.data._id} />
      </CountyPagePreview>
    );

  return (
    <CountyPageLayout data={initial.data} contacts={contacts}>
      <PostList referencesId={initial.data._id} />
    </CountyPageLayout>
  );
}
