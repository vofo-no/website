"use client";

import { countyBySlugQuery } from "@/sanity/lib/queries";
import { useQuery } from "@/sanity/loader/useQuery";
import { CountyPayload } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";

import { CountyPageLayout } from "@/components/pages/county-page";

type Props = {
  slug: string;
  initial: QueryResponseInitial<CountyPayload>;
  children?: React.ReactNode;
  contacts?: React.ReactNode;
};

export default function CountyPagePreview({
  slug,
  initial,
  children,
  contacts,
}: Props) {
  const { data } = useQuery<CountyPayload>(
    countyBySlugQuery,
    { slug },
    { initial },
  );

  return (
    <CountyPageLayout data={data} contacts={contacts}>
      {children}
    </CountyPageLayout>
  );
}
