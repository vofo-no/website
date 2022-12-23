import Image from "next/image";
import Link from "next/link";
import { UrlObject } from "url";
import { urlFor } from "../lib/sanity";
import { ImageType } from "../lib/sanity.api";
import demoPic from "./robert-bye-xjQhTrxyVBw-unsplash.jpg";

interface HeroProps {
  image?: ImageType;
  title?: string;
  href?: string | UrlObject;
  linkText?: string;
}

export default function Hero({ image, title, href, linkText }: HeroProps) {
  const hasLink = href && linkText;

  return (
    <div className="max-w-7xl mx-auto my-4 sm:px-4 lg:px-8">
      <div className="bg-crimson-500 h-64 sm:h-80 lg:h-96 relative">
        <Image
          src={image ? urlFor(image).size(2560, 768).url() : demoPic}
          alt={image?.alt || ""}
          title={image?.attribution}
          placeholder="blur"
          fill
          className="object-cover"
          blurDataURL={
            image && urlFor(image).size(64, 19).quality(30).blur(50).url()
          }
        />
        {(title || hasLink) && (
          <div className="z-1 absolute bottom-0 sm:bottom-4 bg-crimson-500 bg-opacity-80 text-white py-4 px-6">
            {title && (
              <div className="text-xl lg:text-2xl font-semibold">{title}</div>
            )}
            {hasLink && (
              <div className="mt-2">
                <Link href={href} className="hover:underline">
                  {linkText}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
