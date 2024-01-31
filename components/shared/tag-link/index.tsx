import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { tagByIdQuery } from "@/sanity/lib/queries";
import { loadQuery } from "@/sanity/loader/loadQuery";
import { DocumentLinkPayload } from "@/types";

import { TagLinkLayout } from "./layout";

const TagLinkPreview = dynamic(() => import("./preview"));

export interface TagLinkProps
  extends Pick<React.ComponentProps<typeof TagLinkLayout>, "size"> {
  id: string;
}

export async function TagLink({ id, ...rest }: TagLinkProps) {
  const initial = await loadQuery<DocumentLinkPayload>(
    tagByIdQuery,
    { id },
    { next: { tags: [`county:${id}`, `topic:${id}`] } },
  );

  if (draftMode().isEnabled)
    return <TagLinkPreview id={id} initial={initial} {...rest} />;

  return <TagLinkLayout data={initial.data} {...rest} />;
}
