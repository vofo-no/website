import dynamic from "next/dynamic";

import { DocumentLinkType } from "./types";

const DocumentLinkPreviewLoader = dynamic(
  () => import("@/components/shared/document-link/preview"),
);

export const DocumentLinkPreview: DocumentLinkType = (props) => {
  return (
    <DocumentLinkPreviewLoader
      id={props.value._ref}
      initial={{
        data: { _type: "page", slug: "/", title: "..." },
        sourceMap: undefined,
      }}
    />
  );
};
