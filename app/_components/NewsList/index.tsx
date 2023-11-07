import { getIntl } from "lib/intl";
import {
  getPublicationsByDocTypeAndReference,
  searchPublications,
} from "lib/sanity.fetch";
import Image from "next/image";
import { LocaleName } from "types";

import { NewsListItem } from "./NewsListItem";
import NewsListLoader from "./NewsListLoader";
import DreamerImg from "./undraw_dreamer.svg";
import FriendsImg from "./undraw_friends.svg";

interface Props {
  locale?: LocaleName;
  reference?: string;
  searchParams?: { [key: string]: string | string[] | undefined };
  type: "article" | "publication" | "archive";
}

const typeImage = {
  article: FriendsImg,
  publication: DreamerImg,
  archive: DreamerImg,
};

export default function NewsList(props: Props) {
  return (
    <NewsListLoader>
      <div>
        <NewsListLayout {...props} />
      </div>
    </NewsListLoader>
  );
}

async function NewsListLayout({
  locale,
  reference,
  searchParams,
  type,
}: Props) {
  const [items, intl] = await Promise.all([
    type === "archive"
      ? searchPublications(searchParams)
      : getPublicationsByDocTypeAndReference(type, reference),
    getIntl(locale),
  ]);

  const title = (
    <h2 className="mt-2 mb-0">
      {intl.formatMessage({ id: `${type}.list.title` })}
    </h2>
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
