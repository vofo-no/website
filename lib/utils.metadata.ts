import { urlForImage } from "lib/sanity.image";
import type { Metadata } from "next";
import type { Image } from "sanity";

export function defineMetadata({
  description,
  image,
  title,
}: {
  description?: string;
  image?: Image;
  title?: string;
}) {
  const imageUrl =
    image && urlForImage(image)?.width(1200).height(627).fit("crop").url();

  return {
    title,
    themeColor: "#000",
    description,
    openGraph: imageUrl
      ? {
          images: [imageUrl],
        }
      : undefined,
  } satisfies Metadata;
}
