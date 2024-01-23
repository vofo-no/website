"use client";

import { pageBySlugQuery } from "@/sanity/lib/queries";
import { useQuery } from "@/sanity/loader/useQuery";
import { PagePayload } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";

import { PageLayout } from "../../../../components/pages/page-layout";

type Props = {
  slug: string;
  initial: QueryResponseInitial<PagePayload>;
  contacts?: React.ReactNode;
};

export default function PostPagePreview({ slug, initial, contacts }: Props) {
  const { data } = useQuery<PagePayload>(
    pageBySlugQuery,
    { slug },
    { initial },
  );

  return <PageLayout data={data} contacts={contacts} />;
}
