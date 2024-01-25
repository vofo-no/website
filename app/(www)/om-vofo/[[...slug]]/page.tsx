import { Metadata } from "next";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { pageBySlugQuery } from "@/sanity/lib/queries";
import { loadQuery } from "@/sanity/loader/loadQuery";
import { PagePayload } from "@/types";

import { PageLayout } from "@/components/pages/page-layout";
import { Person } from "@/components/shared/person";
import { portableTextBodyTypeComponentsRSC } from "@/components/shared/portable-text-body/type-components";

const PagePreview = dynamic(() => import("./preview"));

interface PageProps {
  params: {
    slug?: string[];
  };
}

function prefixSlug(slug: string[] = []) {
  return ["om-vofo", ...slug].join("/");
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const { data } = await loadQuery<PagePayload>(pageBySlugQuery, {
    slug: prefixSlug(slug),
  });

  if (!data) notFound();

  return {
    title: data.title,
    description: data.description,
  };
}

export default async function Page({ params }: PageProps) {
  const slug = prefixSlug(params.slug);
  const initial = await loadQuery<PagePayload>(pageBySlugQuery, {
    slug,
  });

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
