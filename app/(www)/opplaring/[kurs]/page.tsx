import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { loadCourse } from "@/sanity/loader/loadQuery";
import { groq } from "next-sanity";

import { resolveHref } from "@/lib/resolveHref";
import { Separator } from "@/components/ui/separator";
import { PortableTextBody } from "@/components/shared/portable-text-body";

interface CoursePageProps {
  params: {
    kurs: string;
  };
}

export async function generateMetadata(
  { params: { kurs } }: CoursePageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const data = await loadCourse(kurs);

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
      url: `https://www.vofo.no${resolveHref("course", kurs)}`,
    },
  };
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const data = await client.fetch<{ slug: string }[]>(
    groq`*[_type == "course"][] { "slug": slug.current }`,
    {},
    { next: { tags: ["course"] } },
  );

  return data.map((item) => ({
    kurs: item.slug,
  }));
}

export default async function CoursePage({
  params: { kurs },
}: CoursePageProps) {
  const data = await loadCourse(kurs);

  if (!data) notFound();

  return (
    <div className="container">
      <div className="prose prose-gray mx-auto mt-8">
        <h1>{data.title}</h1>
        <p className="lead">{data.description}</p>
        <Separator />
        <PortableTextBody value={data.body} />
      </div>
    </div>
  );
}
