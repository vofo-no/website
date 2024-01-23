"use client";

import { postBySlugQuery } from "@/sanity/lib/queries";
import { useQuery } from "@/sanity/loader/useQuery";
import { PostPayload } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";

import { PostPageLayout } from "@/components/pages/post-page";

type Props = {
  slug: string;
  initial: QueryResponseInitial<PostPayload>;
};

export default function PostPagePreview({ slug, initial }: Props) {
  const { data } = useQuery<PostPayload>(
    postBySlugQuery,
    { slug },
    { initial },
  );

  return <PostPageLayout data={data} />;
}
