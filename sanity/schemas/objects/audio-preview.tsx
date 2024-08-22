import { Flex, Text } from "@sanity/ui";
import type { PreviewProps } from "sanity";

import { InlineAudio } from "@/components/shared/portable-text-body/body-audio-player";

export function AudioPreview(props: PreviewProps) {
  const { title: url } = props;

  return (
    <Flex padding={3} align="center" justify="center">
      {typeof url === "string" ? (
        <InlineAudio value={{ url }} />
      ) : (
        <Text>Legg inn en fil eller URL</Text>
      )}
    </Flex>
  );
}
