import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { documentLinkByIdQuery } from "@/sanity/lib/queries";
import { loadQuery } from "@/sanity/loader/loadQuery";
import { DocumentLinkPayload } from "@/types";

import { DocumentLinkLayout } from "./layout";

const DocumentLinkPreview = dynamic(() => import("./preview"));

export interface DocumentLinkProps {
  id: string;
}

export async function DocumentLink({ id }: DocumentLinkProps) {
  const initial = await loadQuery<DocumentLinkPayload>(
    documentLinkByIdQuery,
    { id },
    { next: { tags: [id] } },
  );

  if (draftMode().isEnabled)
    return <DocumentLinkPreview id={id} initial={initial} />;

  return <DocumentLinkLayout data={initial.data} />;
}
