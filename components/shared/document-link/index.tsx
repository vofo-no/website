import { loadDocumentLink } from "@/sanity/loader/loadQuery";

import { DocumentLinkLayout } from "./layout";

export interface DocumentLinkProps {
  id: string;
}

export async function DocumentLink({ id }: DocumentLinkProps) {
  const data = await loadDocumentLink(id);

  return <DocumentLinkLayout data={data} />;
}
