import {
  PortableText,
  PortableTextComponents,
  PortableTextTypeComponent,
} from "@portabletext/react";

import { InlineImage } from "./body-image";
import { InlineVideo } from "./body-video";
import { H2WithAnchor } from "./header";
import { portableTextBodyTypeComponentsPreview } from "./type-components-preview";

export type PortableTextBodyTypeComponents = Record<
  string,
  PortableTextTypeComponent<any>
>;

interface Props {
  value: any;
  typeComponents?: PortableTextBodyTypeComponents;
}

export function PortableTextBody({ value, typeComponents }: Props) {
  const portableTextComponents: PortableTextComponents = {
    types: {
      image: InlineImage,
      youtube: InlineVideo,
      ...(typeComponents || portableTextBodyTypeComponentsPreview),
    },
    block: {
      h2: H2WithAnchor,
    },
  };

  return (
    <div className="max-w-prose">
      <PortableText value={value} components={portableTextComponents} />
    </div>
  );
}
