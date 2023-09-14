"use client";

import dynamic from "next/dynamic";

import type { GenericPageProps } from "./GenericPage";

const GenericPage = dynamic(() => import("./GenericPage"));

export default function GenericPagePreview({ data }: GenericPageProps) {
  if (!data) {
    return (
      <div className="text-center">
        Please start editing your Home document to see the preview!
      </div>
    );
  }

  return <GenericPage data={data} />;
}
