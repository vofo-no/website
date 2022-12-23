import { PropsWithChildren } from "react";
import { UrlObject } from "url";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../lib/sanity";

interface CardProps {
  href: string | UrlObject;
  image?: any;
  title: string;
}

export default function Card({
  href,
  image,
  title,
  children,
}: PropsWithChildren<CardProps>) {
  return (
    <Link
      href={href}
      className="max-w-sm rounded overflow-hidden shadow-md hover:shadow-lg"
    >
      {image && (
        <figure className="mb-2">
          <Image
            src={urlFor(image).size(640, 360).url()}
            alt={image.alt || ""}
            width={640}
            height={360}
            title={image.attribution}
            placeholder="blur"
            blurDataURL={urlFor(image).size(32, 18).quality(30).blur(50).url()}
          />
        </figure>
      )}
      <div className="pt-1 pb-4 px-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-base">{children}</p>
      </div>
    </Link>
  );
}
