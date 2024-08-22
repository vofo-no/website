import { refToFileUrl } from "./utils";

interface InlineAudioFields {
  file?: { asset?: { _ref?: string } };
  url?: string;
}

export const InlineAudio = ({ value }: { value: InlineAudioFields }) => {
  const url = value.url || refToFileUrl(value.file?.asset?._ref);

  if (!url) return null;
  return <audio controls src={url} style={{ width: "100%" }} />;
};
