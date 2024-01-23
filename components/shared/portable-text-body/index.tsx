import { PortableText, PortableTextComponents } from "@portabletext/react";

import { InlineImage } from "./body-image";
import { DocumentLink } from "./document-link";
import { H2WithAnchor } from "./header";
import OrganizationsList from "./OrganizationsList";
import { PeopleList } from "./people-list";

interface Props {
  value: any;
}

export function PortableTextBody({ value }: Props) {
  const portableTextComponents: PortableTextComponents = {
    types: {
      people: PeopleList,
      organizations: OrganizationsList,
      image: InlineImage,
      documentLink: DocumentLink,
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
