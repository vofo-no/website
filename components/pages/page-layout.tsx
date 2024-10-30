import { PagePayload } from "@/types";

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

import { RelativeDate } from "../relative-date";

export function PageLayout(
  props: React.PropsWithChildren<{
    data: PagePayload;
    contacts?: React.ReactNode;
  }>,
) {
  const { title, description, body, toc, image, _updatedAt, locale } =
    props.data ?? {};

  const meta = !!_updatedAt;
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
            <PortableTextBody value={body} />
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
                      value={_updatedAt}
                      locale={locale}
                      prefix="Oppdatert"
                    />
                  </small>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-4 md:sticky md:top-28">
              <Toc headers={toc} title={"Innhold"} />
              {props.contacts && (
                <section>
                  <h2 className="font-serif text-2xl">
                    {locale === "nn-NO"
                      ? "Lurer du på noko?"
                      : "Lurer du på noe?"}
                  </h2>
                  {props.contacts}
                </section>
              )}
              <BackToTopButton locale={locale} />
            </div>
          </aside>
        </div>
      </div>
      {props.children}
    </article>
  );
}
