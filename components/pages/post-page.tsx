import { PostPayload } from "@/types";

import { localeName, parseLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";
import { BackToTopButton } from "@/components/back-to-top-button";
import { SanityImage } from "@/components/image";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { PortableTextBody } from "@/components/shared/portable-text-body";
import { Toc } from "@/components/toc";

import { ExpiredAlert } from "../expired-alert";
import { FileDownload } from "../file-download";
import { RelativeDate } from "../relative-date";

function isSameDate(datestr1: string = "", datestr2: string = "") {
  return datestr1.split("T")[0] === datestr2.split("T")[0];
}

function localizedContentLabel(locale: localeName) {
  switch (locale) {
    case "en-US":
      return "Contents";
    case "nn-NO":
      return "Innhald";
    default:
      return "Innhold";
  }
}

export function PostPageLayout(props: {
  data: PostPayload;
  relevance?: React.ReactNode;
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
    expiration,
  } = props.data ?? {};
  const locale = parseLocale(props.data?.locale);
  const meta = !!(publishedAt || _updatedAt);
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
            <ExpiredAlert
              expiredAt={expiration?.expiredAt}
              publishedAt={publishedAt}
              locale={locale}
              explanation={expiration?.explanation}
            />
            <Toc title={localizedContentLabel(locale)} headers={toc} mobile />
            <PortableTextBody value={body} />
            {attachments?.map((file) => (
              <FileDownload file={file} key={file._id} />
            ))}
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
                    <RelativeDate
                      value={publishedAt}
                      locale={locale}
                      prefix="Publisert"
                    />
                    <RelativeDate
                      value={
                        !isSameDate(publishedAt, _updatedAt)
                          ? _updatedAt
                          : undefined
                      }
                      locale={locale}
                      prefix="Oppdatert"
                    />
                  </small>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-4 md:sticky md:top-28">
              <Toc headers={toc} title={localizedContentLabel(locale)} />
              {props.relevance}
              <BackToTopButton locale={locale} />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
