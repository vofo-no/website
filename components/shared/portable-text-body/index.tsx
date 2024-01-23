import { PortableText, PortableTextComponents } from "@portabletext/react";

import { InlineImage } from "./body-image";
import { DocumentLink } from "./document-link";
import { H2WithAnchor } from "./header";
import OrganizationsList from "./OrganizationsList";
import { PeopleList } from "./people-list";

interface Props {
  value: any;
  preview?: boolean;
}

export function PortableTextBody({ value, preview }: Props) {
  const portableTextComponents: PortableTextComponents = {
    types: {
      people: (props) => <PeopleList {...props} preview={preview} />,
      organizations: (props) => (
        <OrganizationsList {...props} preview={preview} />
      ),
      image: InlineImage,
      documentLink: (props) => <DocumentLink {...props} preview={preview} />,
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
