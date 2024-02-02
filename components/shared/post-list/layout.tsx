import Link from "next/link";
import { PostListItemPayload } from "@/types";
import { ArrowRightIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { PostListItem } from "@/components/post-list-item";

export function PostListLayout(props: {
  title?: string;
  data: PostListItemPayload[];
  referencesId?: string;
  archiveParams?: URLSearchParams;
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
      {props.archiveParams && (
        <div className="mt-8 flex justify-center">
          <Link
            href={["/aktuelt", props.archiveParams.toString()]
              .filter(Boolean)
              .join("?")}
            className={buttonVariants({ variant: "outline" })}
          >
            Dokument- og nyhetsarkiv <ArrowRightIcon className="ml-1" />
          </Link>
        </div>
      )}
    </section>
  );
}
