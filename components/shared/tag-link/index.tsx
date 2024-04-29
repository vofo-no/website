import dynamic from "next/dynamic";
import { loadTag } from "@/sanity/loader/loadQuery";

import { TagLinkLayout } from "./layout";

export interface TagLinkProps
  extends Pick<React.ComponentProps<typeof TagLinkLayout>, "size"> {
  id: string;
}

export async function TagLink({ id, ...rest }: TagLinkProps) {
  const data = await loadTag(id);

  return data ? <TagLinkLayout data={data} {...rest} /> : null;
}
