import { PortableTextTypeComponentProps } from "@portabletext/react";
import { Reference } from "sanity";

interface DocumentLinkDef extends Reference {
  _type: "documentLink";
}

export function DocumentLink(
  props: PortableTextTypeComponentProps<DocumentLinkDef> & {
    preview?: boolean;
  },
) {
  return (
    <p>
      DOCUMENT LINK {props.value._ref} (preview: {!!props.preview})
    </p>
  );
}
