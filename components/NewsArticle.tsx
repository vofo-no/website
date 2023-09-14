/*import { urlForImage } from "lib/sanity.image";
import Image from "next/image";
import { ReactNode } from "react";
import { MdDownload } from "react-icons/md";

import formatTime from "../lib/formatTime";
import ContactPerson from "./ContactPerson";
import LinkButton from "./LinkButton";
import NewsItemMeta from "./NewsItemMeta";
import RelevanceLink from "./RelevanceLink";
import TextBody from "./TextBody";

interface NewsArticleProps {
  item: NewsItemType;
  aside?: ReactNode;
}

export default function NewsArticle({ item, aside }: NewsArticleProps) {
  if (!item) return null;

  return (
    <article className="prose lg:prose-lg prose-a:text-blue-700 hover:prose-a:text-crimson-500 prose-h1:font-semibold prose-h1:leading-tight lg:prose-h1:leading-tight max-w-none my-8">
      <NextSeo
        title={item.title}
        openGraph={{
          images: item.image
            ? [
                {
                  url: urlForImage(item.image)?.size(1200, 630).url(),
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
            <figure className="!my-0 -mx-3 sm:-mx-4 md:mx-0">
              <Image
                src={urlForImage(item.image)?.size(1280, 720).url() || ""}
                alt={item.image.alt || ""}
                width={1280}
                height={720}
                placeholder="blur"
                blurDataURL={urlFor(item.image)
                  .size(64, 36)
                  .quality(30)
                  .blur(50)
                  .url()}
              />
              {(item.image.attribution || item.image.caption) && (
                <figcaption className="my-2 px-3 sm:px-4 md:px-0 grid gap-2">
                  {item.image.caption && <span>{item.image.caption}</span>}
                  {item.image.attribution && (
                    <span className="text-xs uppercase">
                      {item.image.attribution}
                    </span>
                  )}
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
          <>
            {item.relevance?.length && (
              <>
                {item.relevance[0].contacts?.length
                  ? item.relevance[0].contacts.map((contact) => (
                      <ContactPerson
                        key={contact._id}
                        {...contact.person}
                        title={contact.job}
                      />
                    ))
                  : null}
                <div>
                  {item.relevance.map((unit) => (
                    <RelevanceLink key={unit._id} item={unit} />
                  ))}
                </div>
              </>
            )}
            {aside}
          </>
        </aside>
      </div>
    </article>
  );
}
*/
