import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { loadPage } from "@/sanity/loader/loadQuery";
import { groq } from "next-sanity";

import { resolveHref } from "@/lib/resolveHref";
import { PageLayout } from "@/components/pages/page-layout";
import { Person } from "@/components/shared/person";

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

function prefixSlug(slug: string[] = []) {
  return ["om-vofo", ...slug].join("/");
}

export async function generateMetadata(
  props: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params;

  const { slug } = params;

  const { data } = await loadPage(prefixSlug(slug));

  if (!data) notFound();

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      images: previousImages,
      title: data.title || undefined,
      type: "website",
      url: `https://www.vofo.no${resolveHref("page", prefixSlug(slug))}`,
    },
  };
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const data = await client.fetch<{ slug: string }[]>(
    groq`*[_type == "page"][] { "slug": slug.current }`,
    {},
    { next: { tags: ["page"] } },
  );

  return data.map((item) => ({
    slug: item.slug.split("/").slice(1),
  }));
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const slug = prefixSlug(params.slug);
  const { data } = await loadPage(slug);

  if (!data) notFound();

  const contacts = data.contacts?.map((reference) => (
    <Person key={`contactperson.${reference._ref}`} id={reference._ref} />
  ));

  return <PageLayout data={data} contacts={contacts} />;
}
