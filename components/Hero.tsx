import classNames from "classnames";
import { urlForImage } from "lib/sanity.image";
import Image from "next/image";
import Link from "next/link";
import { HomePagePayload } from "types";

export default function Hero({ banner }: Pick<HomePagePayload, "banner">) {
  if (!banner) return null;

  const { image, title, url, description, colorScheme } = banner;
  const hasLink = url && description;

  const imageUrl = image && urlForImage(image)?.size(2560, 768).url();
  const blurImageUrl =
    image && urlForImage(image)?.size(64, 19).quality(30).blur(50).url();

  const bgClassName = {
    "bg-crimson-500": colorScheme === "crimson",
    "bg-blue-600": colorScheme === "blue",
    "bg-green-600": colorScheme === "green",
    "bg-red-600": colorScheme === "red",
    "bg-teal-600": colorScheme === "teal",
  };

  return (
    <div className="max-w-screen-xl w-full mx-auto my-6 sm:px-4 lg:px-8">
      <div
        className={classNames(
          bgClassName,
          "h-64 sm:h-80 lg:h-96 relative shadow"
        )}
      >
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={image.alt}
            title={image.credit}
            placeholder="blur"
            fill
            className="object-cover"
            blurDataURL={blurImageUrl}
            priority
          />
        )}
        {(title || hasLink) && (
          <div
            className={classNames(
              bgClassName,
              "z-1 absolute bottom-0 sm:bottom-4 bg-opacity-80 text-white py-4 px-6"
            )}
          >
            {title && (
              <div className="text-xl lg:text-3xl md:text-2xl tracking-tight font-semibold font-open-sans">
                {title}
              </div>
            )}
            {hasLink && (
              <div className="mt-2">
                <Link href={url} className="hover:underline">
                  {description}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
