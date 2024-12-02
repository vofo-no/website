import Link from "next/link";
import { PostListItemPayload } from "@/types";
import { CalendarIcon } from "lucide-react";

import { formatShortDate } from "@/lib/date";
import { SanityImage } from "@/components/image";

import PostTypeBadge from "./post-type-bagde";
import { TagLinkLayout } from "./shared/tag-link/layout";

export function PostListItem(props: {
  item: PostListItemPayload;
  referencesId?: string;
  priority?: boolean;
}) {
  const { title, publishedAt, description, relevance, image, slug, docType } =
    props.item ?? {};
  return (
    <div>
      <div className="relative">
        <PostTypeBadge
          docType={docType}
          className=" absolute bottom-0 right-0 m-1.5 z-10"
        />
        {image && (
          <SanityImage
            mode="listItem"
            image={image}
            priority={props.priority}
          />
        )}
      </div>
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
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary group-hover:underline text-balance hyphens-auto">
          {title}
        </h3>
        <p className="text-muted-foreground line-clamp-3">{description}</p>
      </Link>
    </div>
  );
}
