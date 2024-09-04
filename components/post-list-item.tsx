import Link from "next/link";
import { PostListItemPayload } from "@/types";
import { CalendarIcon } from "lucide-react";
import Balancer from "react-wrap-balancer";

import { formatShortDate } from "@/lib/date";
import { SanityImage } from "@/components/image";

import { TagLinkLayout } from "./shared/tag-link/layout";

export function PostListItem(props: {
  item: PostListItemPayload;
  referencesId?: string;
  priority?: boolean;
}) {
  const { title, publishedAt, description, relevance, image, slug } =
    props.item ?? {};
  return (
    <div>
      {image && (
        <SanityImage mode="listItem" image={image} priority={props.priority} />
      )}
      <div className="my-2 flex flex-wrap gap-x-2 gap-y-1">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <CalendarIcon size={12} />
          {formatShortDate(publishedAt)}
        </span>
        {relevance
          ?.filter(({ _id }) => _id !== props.referencesId)
          .map((tag) => (
            <TagLinkLayout
              key={`${props.item._id}.listitem.taglink.${tag._id}`}
              data={tag}
            />
          ))}
      </div>
      <Link href={`/aktuelt/${slug}`} className="group">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary group-hover:underline hyphens-auto">
          {title}
        </h3>
        <p className="text-muted-foreground line-clamp-3">{description}</p>
      </Link>
    </div>
  );
}
