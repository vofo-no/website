import { PortableText } from "@portabletext/react";
import DocumentLink from "app/_components/DocumentLink";
import People, { PeopleProps } from "app/_components/People";
import slugify from "lib/slugify";
import { DocumentLinkItem } from "types";

const myPortableTextComponents = {
  types: {
    people: ({ value }: { value: PeopleProps }) => {
      const { title, members } = value || {};
      return <People title={title} members={members} />;
    },
    documentLink: ({ value }: { value: DocumentLinkItem }) => {
      return <DocumentLink id={value.item._ref} />;
    },
  },
  block: {
    h2: ({ children }: any) => {
      const anchor = slugify(children[0]);
      return <h2 id={anchor}>{children}</h2>;
    },
  },
};

export default function TextBody({ content }: { content: any }) {
  return (
    <div className="max-w-prose [&>*:first-child]:mt-1 [&>*:last-child]:mb-1">
      <PortableText value={content} components={myPortableTextComponents} />
    </div>
  );
}
