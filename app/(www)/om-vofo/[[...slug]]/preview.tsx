"use client";

import { pageBySlugQuery } from "@/sanity/lib/queries";
import { useQuery } from "@/sanity/loader/useQuery";
import { PagePayload } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";

import { PageLayout } from "@/components/pages/page-layout";

interface Props extends Omit<React.ComponentProps<typeof PageLayout>, "data"> {
  slug: string;
  initial: QueryResponseInitial<PagePayload>;
}

export default function PostPagePreview({ slug, initial, ...rest }: Props) {
  const { data } = useQuery<PagePayload>(
    pageBySlugQuery,
    { slug },
    { initial },
  );

  return <PageLayout data={data} {...rest} />;
}
