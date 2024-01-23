import { PortableTextTypeComponentProps } from "@portabletext/react";
import { Reference } from "sanity";

interface DocumentLinkDef extends Reference {
  _type: "documentLink";
}

export function DocumentLink(
  props: PortableTextTypeComponentProps<DocumentLinkDef>,
) {
  return <p>DOCUMENT LINK {props.value._ref}</p>;
}
