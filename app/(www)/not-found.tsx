import { Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

export const metadata: Metadata = {
  title: "Siden finnes ikke",
};

export default function NotFound() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Siden finnes ikke&hellip;</PageHeaderHeading>
        <PageHeaderDescription>
          Du har prøvd å komme inn på en side vi ikke kan finne. Vi kan ha
          flyttet eller fjernet innholdet, eller nettadressen kan være skrevet
          feil. 🤔
        </PageHeaderDescription>
        <PageActions>
          <Link href="/" className={cn(buttonVariants())}>
            Gå til forsiden
          </Link>
          <Link
            href="/kontakt"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Kontakt oss
          </Link>
        </PageActions>
      </PageHeader>
      <div className="text-muted-foreground/50 text-xs text-center my-4">
        Feilmelding: HTTP 404
      </div>
    </div>
  );
}
