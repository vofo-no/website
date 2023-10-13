import formatRelative from "lib/formatRelative";
import { getNewsItems, getNewsItemsByReference } from "lib/sanity.fetch";
import { urlForImage } from "lib/sanity.image";
import { resolveHref } from "lib/sanity.links";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArticlePayload, PublicationPayload } from "types";

interface Props {
  reference?: string;
  type: "article" | "publication";
}

export default function NewsList(props: Props) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <NewsListLayout {...props} />
    </Suspense>
  );
}

async function NewsListLayout({ reference, type }: Props) {
  const items = reference
    ? await getNewsItemsByReference(type, reference)
    : await getNewsItems(type);

  if (!items || items.length === 0) {
    return <p className="text-lg py-4 text-gray-500">Ingen saker</p>;
  }

  return (
    <div className="flex flex-col divide-y">
      {items.map((item) => (
        <NewsListItem key={item._id} item={item} />
      ))}
    </div>
  );
}

function NewsListItem({ item }: { item: PublicationPayload | ArticlePayload }) {
  const { _type, title, slug, description, image, _updatedAt } = item;
  const imageUrl = image && urlForImage(image)?.size(320, 320).url();
  const imageBlurUrl =
    image && urlForImage(image)?.size(32, 32).quality(30).blur(50).url();

  return (
    <div className="pt-3 mb-3 flex gap-3">
      {imageUrl && (
        <figure className="not-prose w-28 sm:w-40 max-h-48 shrink-0 relative">
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
      <div>
        <h3 className="mt-0">
          <Link href={resolveHref(_type, slug)!} className="no-underline">
            {title}
          </Link>
        </h3>
        <div className="text-gray-600 text-sm leading-normal">
          {description}
        </div>
        <div className="text-gray-600 text-xs leading-normal mt-2">
          {formatRelative(_updatedAt)}
        </div>
      </div>
    </div>
  );
}
