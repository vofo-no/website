import formatRelative from "lib/formatRelative";
import { urlForImage } from "lib/sanity.image";
import { resolveHref } from "lib/sanity.links";
import Image from "next/image";
import Link from "next/link";
import { LocaleName, NewsItemType } from "types";

import TagLink from "./TagLink";

export function NewsListItem({
  item,
  refId,
  locale,
}: {
  item: NewsItemType;
  refId?: string;
  locale?: LocaleName;
}) {
  const { _type, title, slug, description, image, publishedAt, relevance } =
    item;
  const imageUrl = image && urlForImage(image)?.size(320, 320).url();
  const imageBlurUrl =
    image && urlForImage(image)?.size(32, 32).quality(30).blur(50).url();

  return (
    <div className="pt-6 mb-6 flex gap-3">
      {imageUrl && (
        <figure className="not-prose w-28 sm:w-40 max-h-48 min-h-[5rem] sm:min-h-[7rem] shrink-0 relative">
          <Image
            src={imageUrl}
            alt={image.alt}
            title={image.credit}
            placeholder="blur"
            className="object-cover"
            fill
            sizes="(min-width: 640px) 10rem, 7rem"
            blurDataURL={imageBlurUrl}
          />
        </figure>
      )}
      <div className="self-center grow max-w-prose">
        <h3 className="mt-0">
          <Link href={resolveHref(_type, slug)!} className="no-underline">
            {title}
          </Link>
        </h3>
        <div className="text-gray-600 text-sm leading-normal line-clamp-3">
          {description}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
          <div className="text-gray-600 text-xs leading-normal">
            {formatRelative(publishedAt, locale)}
          </div>
          {relevance
            ?.filter((tag) => tag._ref !== refId)
            .map((tag) => (
              <TagLink key={`${item._id}__tags__${tag._ref}`} id={tag._ref} />
            ))}
        </div>
      </div>
    </div>
  );
}
