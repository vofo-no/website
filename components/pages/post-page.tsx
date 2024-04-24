import { PostPayload } from "@/types";

import { formatRelativeDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import { BackToTopButton } from "@/components/back-to-top-button";
import { SanityImage } from "@/components/image";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import {
  PortableTextBody,
  PortableTextBodyTypeComponents,
} from "@/components/shared/portable-text-body";
import { Toc } from "@/components/toc";

import { FileDownload } from "../file-download";

function isSameDate(datestr1: string = "", datestr2: string = "") {
  return datestr1.split("T")[0] === datestr2.split("T")[0];
}

export function PostPageLayout(props: {
  data: PostPayload;
  relevance?: React.ReactNode;
  ptComponents?: PortableTextBodyTypeComponents;
}) {
  const {
    title,
    description,
    attachments,
    body,
    toc,
    image,
    publishedAt,
    _updatedAt,
    locale,
  } = props.data ?? {};
  const meta = [
    publishedAt && `Publisert ${formatRelativeDate(publishedAt, locale)}`,
    _updatedAt &&
      !isSameDate(publishedAt, _updatedAt) &&
      `Oppdatert ${formatRelativeDate(_updatedAt, locale)}`,
  ].filter(Boolean);
  return (
    <article className="container">
      <PageHeader>
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
      </PageHeader>
      <div>
        <div
          className={cn(
            "grid md:grid-cols-3 gap-x-8",
            meta && "md:grid-rows-[auto_1fr]",
          )}
        >
          {image && <SanityImage image={image} mode="header" />}
          <div
            className={cn(
              "md:col-span-2 prose prose-gray dark:prose-invert mx-auto",
              image ? "md:row-start-3" : "md:row-start-1 md:row-span-2",
            )}
          >
            <Toc title="Innhold" headers={toc} mobile />
            {attachments?.map((file) => (
              <FileDownload file={file} key={file._id} />
            ))}
            <PortableTextBody
              value={body}
              typeComponents={props.ptComponents}
            />
          </div>
          <aside
            className={cn(
              "md:col-start-3 md:row-span-2",
              meta && "md:row-start-2",
            )}
          >
            {meta && (
              <div className="border-gray-200 border-y md:border-y-0 my-4 -mx-4 px-4 md:mx-0 md:px-0 md:mt-0">
                <div className="text-muted-foreground my-2">
                  <small className="flex flex-row flex-wrap md:flex-col gap-1">
                    {meta.map((value) => (
                      <span key={`meta.${value}`}>{value}.</span>
                    ))}
                  </small>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-4 md:sticky md:top-28">
              <Toc headers={toc} title={"Innhold"} />
              {props.relevance}
              <BackToTopButton label={"Tilbake til toppen"} />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
