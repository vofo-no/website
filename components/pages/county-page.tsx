import { CountyPayload } from "@/types";

import { cn } from "@/lib/utils";
import { SanityImage } from "@/components/image";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { PortableTextBody } from "@/components/shared/portable-text-body";

import { CountyStatisticBrief } from "../county-statistic-brief";

export function CountyPageLayout(
  props: React.PropsWithChildren<{
    data: CountyPayload;
    contacts?: React.ReactNode;
  }>,
) {
  const { title, description, body, image, slug, locale } = props.data ?? {};

  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
      </PageHeader>
      <div>
        <div className={cn("grid md:grid-cols-3 gap-x-8")}>
          {image && <SanityImage image={image} mode="header" />}
          <div
            className={cn(
              "md:col-span-2 prose prose-gray dark:prose-invert mx-auto",
              image ? "md:row-start-3" : "md:row-start-1 md:row-span-2",
            )}
          >
            <PortableTextBody value={body} />
          </div>
          <aside className={cn("md:col-start-3 md:row-span-3")}>
            <div className="flex flex-col gap-8 md:sticky md:top-28">
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
              <CountyStatisticBrief slug={slug} locale={locale} />
            </div>
          </aside>
        </div>
      </div>
      {props.children}
    </div>
  );
}
