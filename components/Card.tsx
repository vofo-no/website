import classNames from "classnames";
import { urlForImage } from "lib/sanity.image";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { ImageType } from "types";
import { UrlObject } from "url";

interface CardProps {
  href: string | UrlObject;
  image?: ImageType;
  title: string;
  imgPadding?: boolean;
  layout?: "top" | "left";
}

export default function Card({
  href,
  image,
  title,
  imgPadding = false,
  layout = "top",
  children,
}: PropsWithChildren<CardProps>) {
  const baseImage = image && urlForImage(image);
  const imageUrl =
    layout === "top"
      ? baseImage?.size(640, 320).url()
      : baseImage?.width(360).maxHeight(360).fit("max").url();
  const blurImageUrl =
    layout === "top"
      ? baseImage?.size(18, 9).quality(30).blur(50).url()
      : baseImage
          ?.width(18)
          .maxHeight(18)
          .fit("max")
          .quality(30)
          .blur(50)
          .url();

  return (
    <Link
      href={href}
      className={classNames(
        "shadow bg-white overflow-hidden grid transition hover:ring-1 hover:ring-gray-500 hover:shadow-md active:shadow-sm",
        {
          "grid-cols-[128px_auto]": layout === "left",
          "grid-cols-1": layout === "top",
        }
      )}
    >
      {image && (
        <figure
          className={classNames("flex justify-center items-center", {
            "px-4": imgPadding,
            "-mb-1": layout === "top",
          })}
        >
          <Image
            src={imageUrl!}
            alt={image.alt}
            width={640}
            height={320}
            title={image.credit}
            placeholder="blur"
            blurDataURL={blurImageUrl}
          />
        </figure>
      )}
      <div
        className={classNames({
          "my-4 px-4": layout === "top",
          "py-4 pr-4": layout === "left",
        })}
      >
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        {children}
      </div>
    </Link>
  );
}
