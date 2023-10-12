import { ArrowRightCircleIcon } from "@heroicons/react/20/solid";
import { getDocumentById } from "lib/sanity.fetch";
import { urlForImage } from "lib/sanity.image";
import { resolveHref } from "lib/sanity.links";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import DocumentLoading from "./loading";

interface Props {
  id: string;
}

export default function DocumentLink({ id }: Props) {
  return (
    <Suspense key={id} fallback={<DocumentLoading />}>
      <DocumentLayout id={id} />
    </Suspense>
  );
}

async function DocumentLayout({ id }: Props) {
  const data = await getDocumentById(id);

  if (!data) return null;

  const { _type, title, slug, description, image } = data;
  const imageUrl = image && urlForImage(image)?.size(320, 240).url();
  const imageBlurUrl =
    image && urlForImage(image)?.size(32, 24).quality(30).blur(50).url();

  return (
    <Link
      href={resolveHref(_type, slug)!}
      className="flex gap-4 -mx-4 bg-gray-50 border-l-4 border-l-blue-700 my-6 no-underline group items-center"
    >
      <div className="flex flex-col gap-1 shrink overflow-hidden px-4 py-4">
        <div className="leading-snug">
          <ArrowRightCircleIcon className="h-5 inline-block mr-1 align-text-bottom" />
          <strong className="group-hover:underline">{title}</strong>
        </div>
        <div className="text-gray-600 text-sm leading-normal">
          {description}
        </div>
      </div>
      {imageUrl && (
        <figure className="not-prose shrink-0 w-32 sm:w-40">
          <Image
            src={imageUrl}
            alt={image.alt}
            width={160}
            height={120}
            title={image.credit}
            placeholder="blur"
            blurDataURL={imageBlurUrl}
          />
        </figure>
      )}
    </Link>
  );
}
