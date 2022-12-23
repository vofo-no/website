import Image from "next/image";
import { urlFor } from "../lib/sanity";
import { NewsItemType } from "../lib/sanity.api";
import getRoute from "../lib/getRoute";
import Link from "next/link";
import NewsItemMeta from "./NewsItemMeta";

export default function NewsItem({
  featured,
  ...props
}: NewsItemType & { featured?: boolean }) {
  const { _type, title, description, slug, image } = props;
  if (!featured)
    return (
      <div>
        <h3 className="text-lg font-semibold mb-2 leading-tight">
          <Link
            href={getRoute(_type, slug)}
            className="text-blue-700 hover:underline hover:text-crimson-500"
          >
            {title}
          </Link>
        </h3>
        <NewsItemMeta {...props} />
        <p className="text-base text-gray-700">{description}</p>
      </div>
    );

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-2 leading-tight overflow-hidden text-ellipsis">
        <Link
          href={getRoute(_type, slug)}
          className="text-blue-700 hover:underline hover:text-crimson-500"
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
                blurDataURL={urlFor(image)
                  .size(32, 18)
                  .quality(30)
                  .blur(50)
                  .url()}
              />
            </figure>
          )}
          {title}
        </Link>
      </h3>
      <NewsItemMeta {...props} />
      <p className="text-base text-gray-700">{description}</p>
    </div>
  );
}
