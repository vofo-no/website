import Link from "next/link";
import { PostListItemPayload } from "@/types";
import { ArrowRightIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

import { PostListDynamic } from "./list-dynamic";
import { PostListStatic } from "./list-static";
import { PostListProps } from "./types";

interface PostListLayoutProps extends PostListProps {
  data: PostListItemPayload[];
}

export function PostListLayout(props: PostListLayoutProps) {
  return (
    <section className="mb-4">
      <h2 className={props.title ? "text-2xl font-serif mt-8 mb-4" : "sr-only"}>
        {props.title || "Aktuelt"}
      </h2>
      {props.dynamic ? (
        <PostListDynamic
          initialData={props.data}
          searchParams={props.searchParams}
          referencesId={props.referencesId}
        />
      ) : (
        <PostListStatic {...props} />
      )}
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
