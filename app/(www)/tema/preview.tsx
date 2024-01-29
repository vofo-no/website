"use client";

import { allActiveTopicsQuery } from "@/sanity/lib/queries";
import { useQuery } from "@/sanity/loader/useQuery";
import { TopicListItemPayload } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";

import { TopicsIndexPageLayout } from "@/components/pages/topics-index";

type Props = {
  initial: QueryResponseInitial<TopicListItemPayload[]>;
};

export default function TopicsIndexPagePreview({ initial }: Props) {
  const { data } = useQuery<TopicListItemPayload[]>(
    allActiveTopicsQuery,
    {},
    { initial },
  );

  return <TopicsIndexPageLayout data={data} />;
}
