import { Image } from "@/types";
import { PortableTextTypeComponent } from "next-sanity";

import { SanityImage } from "@/components/image";

interface InlineImageDef extends Image {
  _type: "image";
}

export const InlineImage: PortableTextTypeComponent<InlineImageDef> = ({
  value: image,
}) => {
  return <SanityImage image={image} mode="block" />;
};
