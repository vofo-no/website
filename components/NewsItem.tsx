import Image from "next/image";
import { urlFor } from "../lib/sanity";
import shortDate from "../lib/shortDate";
import docTypeDisplay from "../lib/docTypeDisplay";
import { NewsItemType } from "../lib/sanity.api";
import getRoute from "../lib/getRoute";
import Link from "next/link";
import NewsItemMeta from "./NewsItemMeta";

export default function NewsItem({
  featured,
  ...props
}: NewsItemType & { featured?: boolean }) {
  const { _type, docType, title, description, publishedAt, slug, image } =
    props;
  if (!featured)
    return (
      <div>
        <h3 className="text-lg font-semibold mb-2 leading-tight">
          <Link href={getRoute(_type, slug)}>
            <a className="text-blue-700 hover:underline hover:text-crimson-500">
              {title}
            </a>
          </Link>
        </h3>
        <NewsItemMeta {...props} />
        <p className="text-base text-gray-700">{description}</p>
        <p className="text-xs text-gray-500 mt-2">
          <>
            {[docTypeDisplay(docType || _type), shortDate(publishedAt)].join(
              " ⬩ "
            )}
          </>
        </p>
      </div>
    );

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-2 leading-tight">
        <Link href={getRoute(_type, slug)}>
          <a className="text-blue-700 hover:underline hover:text-crimson-500">
            {image && (
              <figure className="mb-1">
                <Image
                  src={urlFor(image).size(640, 360).url()}
                  alt={image.alt}
                  width={640}
                  height={360}
                  title={image.attribution}
                />
              </figure>
            )}
            {title}
          </a>
        </Link>
      </h3>
      <NewsItemMeta {...props} />
      <p className="text-base text-gray-700">{description}</p>
      <p className="text-xs text-gray-500 mt-2">
        <>
          {[docTypeDisplay(docType || _type), shortDate(publishedAt)].join(
            " ⬩ "
          )}
        </>
      </p>
    </div>
  );
}
