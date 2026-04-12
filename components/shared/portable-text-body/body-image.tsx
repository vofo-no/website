import { PortableTextTypeComponent } from "next-sanity";

import { ImagePayload, SanityImage } from "@/components/image";

interface InlineImageDef extends ImagePayload {
  _type: "image";
}

export const InlineImage: PortableTextTypeComponent<InlineImageDef> = ({
  value: image,
}) => {
  return <SanityImage image={image} mode="block" />;
};
