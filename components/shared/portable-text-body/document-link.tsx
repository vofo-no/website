import { DocumentLink as DocumentLinkRSC } from "@/components/shared/document-link";

import { DocumentLinkType } from "./types";

export const DocumentLink: DocumentLinkType = (props) => {
  return <DocumentLinkRSC id={props.value._ref} />;
};
