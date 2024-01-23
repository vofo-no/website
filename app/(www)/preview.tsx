"use client";

import { homeQuery } from "@/sanity/lib/queries";
import { useQuery } from "@/sanity/loader/useQuery";
import { HomePayload } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";

import { HomePageLayout } from "../../components/pages/home-page";

type Props = {
  initial: QueryResponseInitial<HomePayload>;
  children?: React.ReactNode;
};

export default function HomePagePreview(props: Props) {
  const { data } = useQuery<HomePayload>(
    homeQuery,
    {},
    { initial: props.initial },
  );

  return <HomePageLayout data={data}>{props.children}</HomePageLayout>;
}
