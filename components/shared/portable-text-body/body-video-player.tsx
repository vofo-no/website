"use client";

import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export const BodyVideoPlayer = (props: { url: string }) => {
  return <ReactPlayer {...props} />;
};
