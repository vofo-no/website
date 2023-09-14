"use client";

import dynamic from "next/dynamic";

import type { AboutPageProps } from "./AboutPage";

const AboutPage = dynamic(() => import("./AboutPage"));

export default function AboutPagePreview({ data }: AboutPageProps) {
  if (!data) {
    return (
      <div className="text-center">
        Please start editing your Home document to see the preview!
      </div>
    );
  }

  return <AboutPage data={data} />;
}
