import { BodyVideoPlayer } from "./body-video-player";

export const InlineVideo = ({ value }: { value: { url: string } }) => {
  return <BodyVideoPlayer url={value.url} />;
};
