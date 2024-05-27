"use client";

import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export const BodyVideoPlayer = (props: { url: string }) => {
  return (
    <div className="max-w-full aspect-video">
      <ReactPlayer {...props} controls width="100%" height="100%" />
    </div>
  );
};
