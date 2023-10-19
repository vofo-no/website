import { ArrowRightIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import formatRelative from "lib/formatRelative";
import { getIntl } from "lib/intl";
import isSameDay from "lib/isSameDay";
import { urlForImage } from "lib/sanity.image";
import { resolveHref } from "lib/sanity.links";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { PortableTextBlock } from "sanity";
import { County, ImageType, LocaleName, Project, Topic } from "types";

import TextBody from "./TextBody";
import Toc from "./Toc";

interface Props {
  aside?: ReactNode;
  body?: PortableTextBlock[];
  locale?: LocaleName;
  media?: ImageType;
  publishedAt?: string;
  relevance?: Array<Topic | County | Project>;
  toc?: PortableTextBlock[];
  updatedAt?: string;
}

export default async function ArticleBody({
  aside,
  body,
  locale,
  media,
  publishedAt,
  relevance,
  toc,
  updatedAt,
}: Props) {
  const hasMeta = !!(publishedAt || updatedAt);
  const intl = await getIntl(locale);

  const imageUrl = media && urlForImage(media)?.size(1280, 720).url();
  const imageBlurUrl =
    media && urlForImage(media)?.size(64, 36).quality(30).blur(50).url();
  const hasMedia = !!(imageUrl && imageBlurUrl);

  return (
    <div
      className={classNames(
        "grid md:grid-cols-3 gap-x-8",
        hasMeta && "md:grid-rows-[auto_1fr]"
      )}
    >
      {hasMedia ? (
        <figure className="!-mt-4 md:!mt-0 -mx-4 md:mx-0 md:col-span-2 md:row-span-2">
          <Image
            src={imageUrl}
            alt={media.alt}
            width={1280}
            height={720}
            placeholder="blur"
            blurDataURL={imageBlurUrl}
            priority
          />
          {(media.credit || media.caption) && (
            <figcaption className="my-2 px-4 md:px-0 grid gap-2">
              {media.caption && <span>{media.caption}</span>}
              {media.credit && (
                <span className="text-xs uppercase">{media.credit}</span>
              )}
            </figcaption>
          )}
        </figure>
      ) : null}
      <Toc
        headers={toc}
        mobile
        title={intl.formatMessage({ id: "contents" })}
      />
      <div
        className={classNames(
          "md:col-span-2",
          hasMedia ? "md:row-start-3" : "md:row-start-1 md:row-span-2"
        )}
      >
        <TextBody content={body} />
      </div>
      <aside
        className={classNames(
          "md:col-start-3 md:row-span-2",
          hasMeta && "md:row-start-2"
        )}
      >
        {hasMeta ? (
          <div className="border-gray-200 border-y md:border-y-0 my-4 -mx-4 px-4 md:mx-0 md:px-0 md:mt-0">
            <div className="text-gray-600 my-2">
              <small className="flex flex-row flex-wrap md:flex-col gap-1">
                {publishedAt && (
                  <span>
                    {intl.formatMessage(
                      { id: "published" },
                      { publishedAt: formatRelative(publishedAt, locale) }
                    )}
                    .
                  </span>
                )}
                {updatedAt && !isSameDay(updatedAt, publishedAt) && (
                  <span>
                    {intl.formatMessage(
                      { id: "updated" },
                      { updatedAt: formatRelative(updatedAt, locale) }
                    )}
                    .
                  </span>
                )}
              </small>
            </div>
          </div>
        ) : null}
        <div className="flex flex-col gap-4 md:sticky md:top-4">
          <Toc headers={toc} title={intl.formatMessage({ id: "contents" })} />
          {relevance?.map((item) => (
            <h2 key={item._id} className="my-0">
              <Link
                href={resolveHref(item._type, item.slug)!}
                className="no-underline flex items-center gap-1"
              >
                <ArrowRightIcon className="h-6 grow-0" />
                {item._type === "county" ? item.name : item.title}
              </Link>
            </h2>
          ))}
          {aside && <div>{aside}</div>}
        </div>
      </aside>
    </div>
  );
}
