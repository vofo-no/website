import Image from "next/image";
import { NextSeo } from "next-seo";
import { MdDownload } from "react-icons/md";
import formatTime from "../lib/formatTime";
import { urlFor } from "../lib/sanity";
import { NewsItemType } from "../lib/sanity.api";
import LinkButton from "./LinkButton";
import NewsItemMeta from "./NewsItemMeta";
import TextBody from "./TextBody";
import { ReactNode } from "react";

interface NewsArticleProps {
  item: NewsItemType;
  aside?: ReactNode;
}

export default function NewsArticle({ item, aside }: NewsArticleProps) {
  if (!item) return null;

  return (
    <article className="prose lg:prose-lg prose-a:text-blue-700 prose-a:hover:text-crimson-500 prose-h1:font-semibold prose-h1:leading-tight lg:prose-h1:leading-tight max-w-none my-8">
      <NextSeo
        title={item.title}
        openGraph={{
          images: item.image
            ? [
                {
                  url: urlFor(item.image).size(1200, 630).url(),
                  width: 1200,
                  height: 630,
                  alt: item.image.alt,
                },
              ]
            : [],
        }}
      />
      <h1>{item.title}</h1>
      <p className="lead max-w-prose">{item.description}</p>
      <div className="grid md:grid-cols-3 gap-x-4">
        <div className="md:col-span-2 md:row-span-2">
          {item.image && (
            <figure className="mb-2 lg:mb-2 mt-0 lg:mt-0">
              <Image
                src={urlFor(item.image).size(1280, 720).url()}
                alt={item.image?.alt}
                width={1280}
                height={720}
              />
              {(item.image.attribution || item.image.caption) && (
                <figcaption className="clear-both mt-0 lg:mt-0">
                  <span className="float-right inline-block pl-2 italic">
                    {item.image.attribution}
                  </span>
                  {item.image.caption}
                </figcaption>
              )}
            </figure>
          )}
        </div>
        <div className="border-gray-200 border-y md:border-y-0 mb-4">
          <NewsItemMeta {...item} />
          <p className="text-xs text-gray-600 flex flex-row md:flex-col gap-1">
            {item.publishedAt && (
              <span>Publisert {formatTime(item.publishedAt, "PPp")}.</span>
            )}
            {item._updatedAt && item.publishedAt < item._updatedAt && (
              <span>Sist endret {formatTime(item._updatedAt, "PPp")}.</span>
            )}
          </p>
        </div>
        <div className="md:col-span-2">
          {item._type == "publication" && item.attachment && (
            <p className="not-prose">
              <LinkButton href={item.attachment}>
                <span>
                  <MdDownload size={24} />
                </span>
                <span>Last ned dokumentet</span>
              </LinkButton>
            </p>
          )}
          <TextBody content={item.body} />
        </div>
        <aside className="flex flex-col mt-8 gap-4 md:row-span-2 md:row-start-2 md:col-start-3">
          {aside}
        </aside>
      </div>
    </article>
  );
}
