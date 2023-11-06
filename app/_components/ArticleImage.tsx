import { getImageDimensions } from "@sanity/asset-utils";
import { urlForImage } from "lib/sanity.image";
import Image from "next/image";
import { ImageType } from "types";

export default function ArticleImage(image: ImageType) {
  const imageUrl = image && urlForImage(image)?.width(1280).url();
  const imageBlurUrl =
    image && urlForImage(image)?.width(64).quality(30).blur(50).url();
  const hasMedia = !!(imageUrl && imageBlurUrl);

  if (!hasMedia) {
    return null;
  }

  const height = getImageDimensions(imageUrl).height;

  return (
    <figure className="-mx-4 md:mx-0">
      <Image
        src={imageUrl}
        alt={image.alt}
        width={1280}
        height={height}
        placeholder="blur"
        blurDataURL={imageBlurUrl}
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
