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
    fylke: string;
  };
}

export async function generateMetadata({
  params: { fylke },
}: CountyPageProps): Promise<Metadata> {
  const { data } = await loadQuery<CountyPayload>(countyBySlugQuery, {
    slug: fylke,
  });

  return {
    title: data.name,
    description: data.description,
  };
}

export default async function PostPage({ params: { fylke } }: CountyPageProps) {
  const initial = await loadQuery<CountyPayload>(countyBySlugQuery, {
    slug: fylke,
  });

  const contacts = initial.data.contacts?.map((reference) => (
    <Person key={`contactperson.${reference._ref}`} id={reference._ref} />
  ));

  if (draftMode().isEnabled)
    return (
      <CountyPagePreview initial={initial} slug={fylke} contacts={contacts}>
        <PostList referencesId={initial.data._id} />
      </CountyPagePreview>
    );

  return (
    <CountyPageLayout data={initial.data} contacts={contacts}>
      <PostList referencesId={initial.data._id} />
    </CountyPageLayout>
  );
}
