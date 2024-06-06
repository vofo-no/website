import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { loadCourse } from "@/sanity/loader/loadQuery";

import { resolveHref } from "@/lib/resolveHref";
import { Separator } from "@/components/ui/separator";
import { PortableTextBody } from "@/components/shared/portable-text-body";

interface CourseLessonPageProps {
  params: {
    kurs: string;
    leksjon: string;
  };
}

export async function generateMetadata(
  { params }: CourseLessonPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const data = await loadCourse(params.kurs);

  const lesson = data?.lessons.find((item) => item.slug === params.leksjon);

  if (!lesson) notFound();

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: lesson.title,
    description: lesson.description,
    openGraph: {
      images: previousImages,
      title: lesson.title,
      type: "website",
      url: `https://www.vofo.no${resolveHref("course", params.kurs)}/${params.leksjon}`,
    },
  };
}

export default async function CourseLessonPage({
  params,
}: CourseLessonPageProps) {
  const data = await loadCourse(params.kurs);

  const lesson = data?.lessons.find((item) => item.slug === params.leksjon);

  if (!lesson) notFound();

  return (
    <div className="container">
      <div className="prose prose-gray mx-auto mt-8">
        <h1>{lesson.title}</h1>
        <p className="lead">{lesson.description}</p>
        <Separator />
        <PortableTextBody value={lesson.body} />
      </div>
    </div>
  );
}
