import Link from "next/link";
import { PostListItemPayload } from "@/types";
import { ArrowRightIcon, CalendarIcon } from "lucide-react";
import Balancer from "react-wrap-balancer";

import { buttonVariants } from "@/components/ui/button";
import { SanityImage } from "@/components/image";
import { TagLink } from "@/components/tag-link";

const shortDate = new Intl.DateTimeFormat("nb-NO", {
  month: "short",
  day: "numeric",
});

function PostListItem(props: {
  item: PostListItemPayload;
  referencesId?: string;
}) {
  const { title, publishedAt, description, image, relevance, slug } =
    props.item ?? {};
  return (
    <div>
      {image && <SanityImage mode="listItem" image={image} />}
      <div className="my-2 flex flex-wrap gap-x-2 gap-y-1">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <CalendarIcon size={12} />
          {shortDate.format(new Date(publishedAt))}
        </span>
        {relevance
          ?.filter((tag) => tag._id !== props.referencesId)
          .map((tag) => (
            <TagLink key={tag._id} _type={tag._type} slug={tag.slug}>
              {tag.title}
            </TagLink>
          ))}
      </div>
      <Link href={`/aktuelt/${slug}`} className="group">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary group-hover:underline">
          <Balancer>{title}</Balancer>
        </h3>
        <p className="text-muted-foreground line-clamp-3">{description}</p>
      </Link>
    </div>
  );
}

export function PostListLayout(props: {
  data: PostListItemPayload[];
  referencesId?: string;
  title?: string;
}) {
  return (
    <section className="mb-4">
      {props.title ? (
        <h2 className="text-2xl font-serif mt-8 mb-4">{props.title}</h2>
      ) : (
        <h2 className="sr-only">Aktuelt</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-8">
        {props.data.map((item) => (
          <PostListItem
            key={item._id}
            item={item}
            referencesId={props.referencesId}
          />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Link
          href="/aktuelt/arkiv"
          className={buttonVariants({ variant: "outline" })}
        >
          Dokument- og nyhetsarkiv <ArrowRightIcon className="ml-1" />
        </Link>
      </div>
    </section>
  );
}
