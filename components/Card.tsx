import classNames from "classnames";
import { urlForImage } from "lib/sanity.image";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { UrlObject } from "url";

interface CardProps {
  href: string | UrlObject;
  image?: any;
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
  const imageUrl =
    image &&
    urlForImage(image)
      ?.width(layout === "top" ? 640 : 360)
      .fit("max")
      .url();
  const blurImageUrl =
    image &&
    urlForImage(image)
      ?.maxWidth(layout === "top" ? 18 : 32)
      .maxHeight(18)
      .quality(30)
      .blur(50)
      .url();

  return (
    <Link
      href={href}
      className={classNames("shadow bg-white overflow-hidden grid gap-1", {
        "grid-cols-[128px_auto]": layout === "left",
        "grid-cols-1": layout === "top",
      })}
    >
      {imageUrl && (
        <figure
          className={classNames("mb-2 flex justify-center items-center", {
            "px-4 pt-2": imgPadding,
            "aspect-video": layout === "top",
          })}
        >
          <Image
            src={imageUrl}
            alt={image.alt || ""}
            width={640}
            height={360}
            title={image.attribution}
            placeholder="blur"
            blurDataURL={blurImageUrl}
          />
        </figure>
      )}
      <div
        className={classNames({
          "pb-4 px-4": layout === "top",
          "py-4 pr-4": layout === "left",
        })}
      >
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        {children}
      </div>
    </Link>
  );
}
