import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { Image as ImagePayload } from "@/types";
import { getImageDimensions } from "@sanity/asset-utils";

import { AspectRatio } from "./ui/aspect-ratio";

interface Props {
  image: ImagePayload;
  mode?: "header" | "block" | "listItem";
}

export function SanityImage({ image, mode = "block" }: Props) {
  if (!image.asset) return null;

  const url = urlForImage(image);

  if (mode === "header") {
    return (
      <figure className="md:col-span-2 md:row-span-2 -mx-4 md:mx-0">
        <Image
          src={url.size(2560, 1440).url()}
          alt={image.alt}
          width={2560}
          height={1440}
          sizes="(max-width: 768px) 100vw, 66vw"
          placeholder="blur"
          blurDataURL={url.width(20).quality(20).url()}
          priority
        />
        {(image.credit || image.caption) && (
          <figcaption className="my-2 px-4 md:px-0 grid gap-2 text-muted-foreground text-sm">
            {image.caption && <span>{image.caption}</span>}
            {image.credit && (
              <span className="text-xs uppercase">{image.credit}</span>
            )}
          </figcaption>
        )}
      </figure>
    );
  }

  if (mode === "listItem") {
    return (
      <AspectRatio ratio={16 / 9}>
        <figure className="w-full h-full object-cover rounded border bg-secondary">
          <Image
            src={url.url()}
            alt={image.alt}
            title={image.credit}
            placeholder="blur"
            className="object-cover"
            fill
            sizes="30rem"
            blurDataURL={url.width(20).quality(20).url()}
            priority
          />
        </figure>
      </AspectRatio>
    );
  }

  const imageUrl = url.width(1280).url();

  return (
    <figure className="-mx-4 md:mx-0">
      <Image
        src={imageUrl}
        alt={image.alt}
        width={1280}
        height={getImageDimensions(imageUrl).height}
        placeholder="blur"
        blurDataURL={url.width(20).quality(20).url()}
      />
      {(image.credit || image.caption) && (
        <figcaption className="my-2 px-4 md:px-0 grid gap-2">
          {image.caption && <span>{image.caption}</span>}
          {image.credit && (
            <span className="text-xs uppercase">{image.credit}</span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
