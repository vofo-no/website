import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import { DocumentLinkPayload } from "@/types";

import { resolveHref } from "@/lib/resolveHref";

interface Props {
  data?: DocumentLinkPayload | null;
}

export function DocumentLinkLayout({ data }: Props) {
  if (!data) return null;

  const { _type, title, slug, description, image } = data;
  const imageUrl = image && urlForImage(image)?.size(320, 240).url();
  const imageBlurUrl =
    image && urlForImage(image)?.size(32, 24).quality(30).blur(50).url();

  return (
    <Link
      href={resolveHref(_type, slug)!}
      className="flex gap-4 -mx-4 bg-muted border-l-4 border-l-blue-700 my-6 no-underline group items-center justify-between rounded-xl overflow-hidden hover:shadow duration-150 ease-in-out"
    >
      <div className="flex flex-col gap-1 shrink overflow-hidden px-4 py-4">
        <div className="leading-snug text-lg text-blue-700 flex gap-1 items-center">
          <strong className="group-hover:underline">{title}</strong>
        </div>
        <div className="text-sm font-normal text-muted-foreground leading-normal">
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
