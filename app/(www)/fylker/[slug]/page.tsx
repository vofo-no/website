import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { loadCounty } from "@/sanity/loader/loadQuery";
import { groq } from "next-sanity";

import { resolveHref } from "@/lib/resolveHref";
import { CountyPageLayout } from "@/components/pages/county-page";
import { Person } from "@/components/shared/person";
import { PostList } from "@/components/shared/post-list";

interface CountyPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params: { slug } }: CountyPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const data = await loadCounty(slug);

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
      url: `https://www.vofo.no${resolveHref("county", slug)}`,
    },
  };
}

export const dynamicParams = true;

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
  const data = await loadCounty(slug);

  if (!data) notFound();

  const contacts = data.contacts?.map((reference) => (
    <Person key={`contactperson.${reference._ref}`} id={reference._ref} />
  ));

  const archiveParams = new URLSearchParams({ filter: slug });

  return (
    <CountyPageLayout data={data} contacts={contacts}>
      <PostList
        referencesId={data._id}
        title={`Aktuelt ${data.locale === "nn-NO" ? "frå" : "fra"} ${data.title}`}
        archiveParams={archiveParams}
      />
    </CountyPageLayout>
  );
}
