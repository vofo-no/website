import Link from "next/link";
import {
  PortableText,
  PortableTextComponents,
  PortableTextTypeComponent,
} from "next-sanity";

import { InlineAudio } from "./body-audio-player";
import { InlineCta } from "./body-cta";
import { BodyEventReference } from "./body-event-reference";
import { InlineImage } from "./body-image";
import { BodyQuiz } from "./body-quiz";
import { BodySdgRef } from "./body-sdg-ref";
import { InlineVideo } from "./body-video";
import { DocumentLink } from "./document-link";
import { H2WithAnchor } from "./header";
import { PeopleList } from "./people-list";
import { refToFileUrl } from "./utils";

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
      audio: InlineAudio,
      cta: InlineCta,
      image: InlineImage,
      youtube: InlineVideo,
      documentLink: DocumentLink,
      eventReference: BodyEventReference,
      people: PeopleList,
      "sdg-ref": BodySdgRef,
      quiz: BodyQuiz,
    },
    block: {
      h2: H2WithAnchor,
    },
    marks: {
      assetLink: ({ children, value }) => {
        const fileUrl = refToFileUrl(value.file.asset._ref);
        return fileUrl ? <Link href={fileUrl}>{children}</Link> : children;
      },
    },
  };

  return (
    <div className="max-w-prose">
      <PortableText value={value} components={portableTextComponents} />
    </div>
  );
}
