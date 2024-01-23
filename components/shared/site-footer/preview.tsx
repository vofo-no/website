"use client";

import { useSettings } from "@/sanity/loader/useQuery";

import { SiteFooterLayout } from "./layout";

type Props = {
  initial: Parameters<typeof useSettings>[0];
};

export default function SiteFooterPreview(props: Props) {
  const { data } = useSettings(props.initial);

  return <SiteFooterLayout data={data} />;
}
