import { Metadata, ResolvingMetadata } from "next";
import _dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { urlForImage } from "@/sanity/lib/image";
import { loadPage } from "@/sanity/loader/loadQuery";

import { resolveHref } from "@/lib/resolveHref";
import { PageLayout } from "@/components/pages/page-layout";
import { Person } from "@/components/shared/person";
import { portableTextBodyTypeComponentsRSC } from "@/components/shared/portable-text-body/type-components";

const PagePreview = _dynamic(() => import("./preview"));

interface PageProps {
  params: {
    slug?: string[];
  };
}

function prefixSlug(slug: string[] = []) {
  return ["om-vofo", ...slug].join("/");
}

export async function generateMetadata(
  { params: { slug } }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data } = await loadPage(prefixSlug(slug));

  if (!data) notFound();

  const previousImages = (await parent).openGraph?.images || [];
  const image = data.image && urlForImage(data.image).size(1200, 630).url();

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      images: image ? [image, ...previousImages] : previousImages,
      title: data.title,
      type: "website",
      url: `https://www.vofo.no${resolveHref("page", prefixSlug(slug))}`,
    },
  };
}

// Waiting for https://github.com/vercel/next.js/issues/59883
export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
  /*  const data = await client.fetch<{ slug: string }[]>(
    groq`*[_type == "page"][] { "slug": slug.current }`,
    {},
    { next: { tags: ["page"] } },
  );

  return data.map((item) => ({
    slug: item.slug.split("/").slice(1),
  }));*/
}

export default async function Page({ params }: PageProps) {
  const slug = prefixSlug(params.slug);
  const initial = await loadPage(slug);

  if (!initial.data) notFound();

  const contacts = initial.data.contacts?.map((reference) => (
    <Person key={`contactperson.${reference._ref}`} id={reference._ref} />
  ));

  if (draftMode().isEnabled)
    return <PagePreview initial={initial} slug={slug} contacts={contacts} />;

  return (
    <PageLayout
      data={initial.data}
      contacts={contacts}
      ptComponents={portableTextBodyTypeComponentsRSC}
    />
  );
}
