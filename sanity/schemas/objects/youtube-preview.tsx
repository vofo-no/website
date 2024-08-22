import { Flex, Text } from "@sanity/ui";
import ReactPlayer from "react-player/lazy";
import type { PreviewProps } from "sanity";

export function YouTubePreview(props: PreviewProps) {
  const { title: url } = props;

  return (
    <Flex padding={3} align="center" justify="center">
      {typeof url === "string" ? (
        <ReactPlayer url={url} controls />
      ) : (
        <Text>Legg inn en Video-URL</Text>
      )}
    </Flex>
  );
}
