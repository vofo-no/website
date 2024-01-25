import { CountyPayload } from "@/types";

import { cn } from "@/lib/utils";
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

export function CountyPageLayout(
  props: React.PropsWithChildren<{
    data: CountyPayload;
    contacts?: React.ReactNode;
    ptComponents?: PortableTextBodyTypeComponents;
  }>,
) {
  const { name, description, body, image, locale } = props.data ?? {};

  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>{name}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
      </PageHeader>
      <div>
        <div className={cn("grid md:grid-cols-3 gap-x-8")}>
          {image && <SanityImage image={image} mode="header" />}
          <div
            className={cn(
              "md:col-span-2 prose mx-auto",
              image ? "md:row-start-3" : "md:row-start-1 md:row-span-2",
            )}
          >
            <PortableTextBody
              value={body}
              typeComponents={props.ptComponents}
            />
          </div>
          <aside className={cn("md:col-start-3 md:row-span-2")}>
            <div className="flex flex-col gap-4 md:sticky md:top-28">
              {props.contacts && (
                <section>
                  <h2 className="font-serif text-2xl">Lurer du på noe?</h2>
                  {props.contacts}
                </section>
              )}
            </div>
          </aside>
        </div>
      </div>
      {props.children}
    </div>
  );
}
