import Link from "next/link";
import { DocumentLinkPayload } from "@/types";

import { resolveHref } from "@/lib/resolveHref";
import { cn } from "@/lib/utils";
import { SanityImage } from "@/components/image";

interface Props {
  data?: DocumentLinkPayload | null;
}

export function DocumentLinkLayout({ data }: Props) {
  if (!data) return null;

  const { _type, title, slug, description, image } = data;

  return (
    <article className="-mx-4 my-6 not-prose">
      <Link
        href={resolveHref(_type, slug)!}
        className={cn(
          "grid bg-secondary border-l-4 -ml-1 group overflow-hidden hover:shadow-lg duration-150 ease-in-out sm:[clip-path:polygon(calc(100%_-_2rem)_0%,100%_50%,calc(100%_-_2rem)_100%,0%_100%,0%_0%)]",
          image && "grid-cols-[auto_128px] sm:grid-cols-[auto_150px] gap-4",
        )}
      >
        <div className="overflow-hidden p-4 self-center space-y-1">
          <h3 className="text-xl font-semibold text-blue-700 group-hover:text-primary group-hover:underline text-balance hyphens-auto">
            {title}
          </h3>
          <div className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </div>
        </div>
        {image && (
          <figure className="[clip-path:polygon(100%_0%,100%_100%,0%_100%,2rem_50%,0%_0%)]">
            <SanityImage mode="docLink" image={image} />
          </figure>
        )}
      </Link>
    </article>
  );
}
