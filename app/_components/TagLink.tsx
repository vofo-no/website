import classNames from "classnames";
import { getTaggedById } from "lib/sanity.fetch";
import { resolveHref } from "lib/sanity.links";
import Link from "next/link";
import React from "react";

interface Props {
  id: string;
}

export default function TagLink({ id }: Props) {
  if (!id) return null;

  return (
    <React.Suspense fallback="...">
      <TagLinkLayout id={id} />
    </React.Suspense>
  );
}

async function TagLinkLayout({ id }: Props) {
  const item = await getTaggedById(id);

  if (!item) return null;

  return (
    <Link
      href={resolveHref(item._type, item.slug) || ""}
      className={classNames(
        " rounded-lg text-sm no-underline px-2",
        item._type === "county"
          ? "bg-blue-700 text-white hover:bg-crimson-500 hover:text-white"
          : "border border-blue-700 hover:border-crimson-500"
      )}
    >
      {item.name || item.title}
    </Link>
  );
}
