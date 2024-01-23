"use client";

import { allActiveCountiesQuery } from "@/sanity/lib/queries";
import { useQuery } from "@/sanity/loader/useQuery";
import { CountyListItemPayload } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";

import { CountiesIndexPageLayout } from "@/components/pages/counties-index-page";

type Props = {
  initial: QueryResponseInitial<CountyListItemPayload[]>;
};

export default function CountiesIndexPagePreview({ initial }: Props) {
  const { data } = useQuery<CountyListItemPayload[]>(
    allActiveCountiesQuery,
    {},
    { initial },
  );

  return <CountiesIndexPageLayout data={data} />;
}
