import formatRelative from "lib/formatRelative";
import { getIntl } from "lib/intl";
import { getNewsItems, getNewsItemsByReference } from "lib/sanity.fetch";
import { urlForImage } from "lib/sanity.image";
import { resolveHref } from "lib/sanity.links";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArticlePayload, LocaleName, PublicationPayload } from "types";

import TagLink from "./TagLink";
import DreamerImg from "./undraw_dreamer.svg";
import FriendsImg from "./undraw_friends.svg";

interface Props {
  reference?: string;
  type: "article" | "publication";
  locale?: LocaleName;
}

const typeImage = {
  article: FriendsImg,
  publication: DreamerImg,
};

export default function NewsList(props: Props) {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <NewsListLayout {...props} />
      </Suspense>
    </div>
  );
}

async function NewsListLayout({ reference, type, locale }: Props) {
  const items = reference
    ? await getNewsItemsByReference(type, reference)
    : await getNewsItems(type);

  const intl = await getIntl(locale);

  const title = (
    <h2 className="mt-0">{intl.formatMessage({ id: `${type}.list.title` })}</h2>
  );

  if (!items || items.length === 0) {
    return (
      <>
        {title}
        <p className="text-center text-gray-500">
          <Image
            src={typeImage[type]}
            alt=""
            className="max-w-xs w-2/3 max-h-48 mx-auto"
            priority
          />
          {intl.formatMessage({ id: `${type}.list.empty` })}
        </p>
      </>
    );
  }

  return (
    <>
      {title}
      <div className="flex flex-col divide-y">
        {items.map((item) => (
          <NewsListItem
            key={item._id}
            item={item}
            refId={reference}
            locale={locale}
          />
        ))}
      </div>
    </>
  );
}

function NewsListItem({
  item,
  refId,
  locale,
}: {
  item: PublicationPayload | ArticlePayload;
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
      <div className="self-center">
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
            ?.filter((tag) => tag._id !== refId)
            .map((tag) => (
              <TagLink key={tag._id} item={tag} />
            ))}
        </div>
      </div>
    </div>
  );
}
