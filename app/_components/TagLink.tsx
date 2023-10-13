import classNames from "classnames";
import { resolveHref } from "lib/sanity.links";
import Link from "next/link";
import { County, Topic } from "types";

interface Props {
  item?: County | Topic;
}

export default function TagLink({ item }: Props) {
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
      {item._type === "county" ? item.name : item.title}
    </Link>
  );
}
