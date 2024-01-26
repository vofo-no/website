"use client";

import { topicBySlugQuery } from "@/sanity/lib/queries";
import { useQuery } from "@/sanity/loader/useQuery";
import { TopicPayload } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";

import { CountyPageLayout } from "@/components/pages/county-page";

type Props = {
  slug: string;
  initial: QueryResponseInitial<TopicPayload>;
  children?: React.ReactNode;
  contacts?: React.ReactNode;
};

export default function TopicPagePreview({
  slug,
  initial,
  children,
  contacts,
}: Props) {
  const { data } = useQuery<TopicPayload>(
    topicBySlugQuery,
    { slug },
    { initial },
  );

  return (
    <CountyPageLayout data={data} contacts={contacts}>
      {children}
    </CountyPageLayout>
  );
}
