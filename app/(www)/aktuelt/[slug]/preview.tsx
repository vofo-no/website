"use client";

import { postBySlugQuery } from "@/sanity/lib/queries";
import { useQuery } from "@/sanity/loader/useQuery";
import { PostPayload } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";

import { PostPageLayout } from "@/components/pages/post-page";

interface PostPagePreviewProps
  extends Omit<React.ComponentProps<typeof PostPageLayout>, "data"> {
  slug: string;
  initial: QueryResponseInitial<PostPayload>;
}

export default function PostPagePreview({
  slug,
  initial,
  ...rest
}: PostPagePreviewProps) {
  const { data } = useQuery<PostPayload>(
    postBySlugQuery,
    { slug },
    { initial },
  );

  return <PostPageLayout data={data} {...rest} />;
}
