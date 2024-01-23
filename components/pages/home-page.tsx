import Link from "next/link";
import { HomePayload } from "@/types";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Announcement } from "@/components/announcement";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

export function HomePageLayout(props: {
  data: HomePayload;
  children?: React.ReactNode;
}) {
  const { title, description, announcement } = props.data ?? {};
  return (
    <div className="container">
      <PageHeader>
        {announcement && <Announcement {...announcement} />}
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions>
          <Link href="/om-vofo" className={cn(buttonVariants())}>
            Bli kjent med Vofo
          </Link>
          <Link
            href="/studieforbund"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Om studieforbund
          </Link>
        </PageActions>
      </PageHeader>
      {props.children}
    </div>
  );
}
