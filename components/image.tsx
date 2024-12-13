import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { Image as ImagePayload } from "@/types";
import { getImageDimensions } from "@sanity/asset-utils";
import { vercelStegaClean } from "@vercel/stega";

import { AspectRatio } from "./ui/aspect-ratio";

interface Props {
  image: ImagePayload;
  mode?: "header" | "block" | "listItem";
  priority?: boolean;
}

export function SanityImage({ image, mode = "block", priority }: Props) {
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
          priority={priority ?? true}
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
        <Image
          className="w-full h-full object-cover rounded border bg-secondary"
          src={url.size(720, 405).dpr(2).url()}
          alt={image.alt}
          title={image.credit}
          width={720}
          height={405}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={url.width(20).quality(20).url()}
          priority={priority}
        />
      </AspectRatio>
    );
  }

  if (vercelStegaClean(image.position) === "floatRight") {
    const imageUrl = url.width(640).url();

    return (
      <figure className="-mx-4 md:w-[40%] md:ml-4 md:mr-0 md:float-right clear-right">
        <Image
          src={imageUrl}
          alt={image.alt}
          width={640}
          height={getImageDimensions(imageUrl).height}
          placeholder="blur"
          blurDataURL={url.width(20).quality(20).url()}
          priority={priority}
          className="mx-auto w-auto portrait:max-h-[50vh] landscape:max-h-[75vh]"
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
        priority={priority}
        className="mx-auto w-auto portrait:max-h-[50vh] landscape:max-h-[75vh] md:landscape:max-h-[60vh]"
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
