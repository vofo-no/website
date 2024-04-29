import { Metadata } from "next";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { loadCounty } from "@/sanity/loader/loadQuery";
import { groq } from "next-sanity";

import { resolveHref } from "@/lib/resolveHref";
import { CountyPageLayout } from "@/components/pages/county-page";
import { Person } from "@/components/shared/person";
import { portableTextBodyTypeComponentsRSC } from "@/components/shared/portable-text-body/type-components";
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

  const image = data.image && urlForImage(data.image).size(1200, 630).url();

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      images: image,
      title: data.title,
      type: "website",
      url: `https://www.vofo.no${resolveHref("county", slug)}`,
    },
  };
}

export async function generateStaticParams() {
  const data = await client.fetch<{ slug: string }[]>(
    groq`*[_type == "county"][] { "slug": slug.current }`,
    {},
    { next: { tags: ["county"] } },
  );

  return data.map((item) => ({
    slug: item.slug,
  }));
}

export default async function CountyPage({
  params: { slug },
}: CountyPageProps) {
  const initial = await loadCounty(slug);

  if (!initial.data) notFound();

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
    <CountyPageLayout
      data={initial.data}
      contacts={contacts}
      ptComponents={portableTextBodyTypeComponentsRSC}
    >
      <PostList
        referencesId={initial.data._id}
        title={`Aktuelt fra ${initial.data.title}`}
        archiveParams={archiveParams}
      />
    </CountyPageLayout>
  );
}
