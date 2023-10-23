import { getLinkedById } from "lib/sanity.fetch";
import { resolveHref } from "lib/sanity.links";
import shortDate from "lib/shortDate";
import Link from "next/link";
import { Suspense } from "react";

interface Props {
  id: string;
}

export default async function LinkToId(props: Props) {
  return (
    <Suspense key={props.id} fallback={"..."}>
      <LinkToIdLayout {...props} />
    </Suspense>
  );
}

async function LinkToIdLayout({ id }: Props) {
  const data = await getLinkedById(id);
  if (!data) return null;

  const href = resolveHref(data._type, data.slug);
  if (!href) return null;

  return (
    <>
      <Link href={href}>{data.title}</Link>{" "}
      {data.publishedAt ? <>({shortDate(data.publishedAt)})</> : null}
    </>
  );
}
