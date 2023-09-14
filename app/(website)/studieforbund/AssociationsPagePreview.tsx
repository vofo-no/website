"use client";

import dynamic from "next/dynamic";

import type { AssociationsPageProps } from "./AssociationsPage";

const AssociationsPage = dynamic(() => import("./AssociationsPage"));

export default function AssociationsPagePreview({
  data,
}: AssociationsPageProps) {
  if (!data) {
    return (
      <div className="text-center">
        Please start editing your Home document to see the preview!
      </div>
    );
  }

  return <AssociationsPage data={data} />;
}
