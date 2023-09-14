"use client";

import dynamic from "next/dynamic";

import type { HomePageProps } from "./HomePage";

const HomePage = dynamic(() => import("./HomePage"));

export default function HomePagePreview({ data }: HomePageProps) {
  if (!data) {
    return (
      <div className="text-center">
        Please start editing your Home document to see the preview!
      </div>
    );
  }

  return <HomePage data={data} />;
}
