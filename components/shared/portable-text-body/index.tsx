import {
  PortableText,
  PortableTextComponents,
  PortableTextTypeComponent,
} from "next-sanity";

import { InlineImage } from "./body-image";
import { InlineVideo } from "./body-video";
import { DocumentLink } from "./document-link";
import { H2WithAnchor } from "./header";
import { PeopleList } from "./people-list";

export type PortableTextBodyTypeComponents = Record<
  string,
  PortableTextTypeComponent<any>
>;

interface Props {
  value: any;
}

export function PortableTextBody({ value }: Props) {
  const portableTextComponents: PortableTextComponents = {
    types: {
      image: InlineImage,
      youtube: InlineVideo,
      documentLink: DocumentLink,
      people: PeopleList,
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
