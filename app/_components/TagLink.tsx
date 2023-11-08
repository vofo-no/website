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
        "text-xs whitespace-nowrap uppercase no-underline px-1",
        item._type === "county"
          ? "border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
          : "border border-crimson-500 text-crimson-500 hover:bg-crimson-500 hover:text-white"
      )}
    >
      {item.name || item.title}
    </Link>
  );
}
