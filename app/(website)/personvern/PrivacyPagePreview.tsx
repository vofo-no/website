"use client";

import dynamic from "next/dynamic";

import type { PrivacyPageProps } from "./PrivacyPage";

const PrivacyPage = dynamic(() => import("./PrivacyPage"));

export default function PrivacyPagePreview({ data }: PrivacyPageProps) {
  if (!data) {
    return (
      <div className="text-center">
        Please start editing your Home document to see the preview!
      </div>
    );
  }

  return <PrivacyPage data={data} />;
}
