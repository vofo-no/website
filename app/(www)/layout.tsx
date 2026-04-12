import { Metadata } from "next";
import { draftMode } from "next/headers";
import Link from "next/link";
import { SanityLive } from "@/sanity/lib/live";
import { Analytics } from "@vercel/analytics/react";
import { VisualEditing } from "next-sanity/visual-editing";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { DisableDraftMode } from "@/components/disable-draft-mode";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/site-header";
import { UserFeedback } from "@/components/user-feedback";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vofo.no"),
  title: {
    template: "%s | Voksenopplæringsforbundet",
    default: "Voksenopplæringsforbundet",
  },
};

export default async function WwwLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative flex min-h-screen flex-col bg-background">
        <div role="navigation" aria-labelledby="topp">
          <Link
            className="sr-only focus-visible:not-sr-only focus:!absolute z-[99] focus:!w-full focus:p-2 bg-primary text-primary-foreground text-center"
            href="#hovedinnhold"
            id="topp"
          >
            Hopp til hovedinnholdet
          </Link>
        </div>
        <SiteHeader />
        <Breadcrumbs />
        <main
          className="flex-1 scroll-mt-32 md:scroll-mt-28"
          id="hovedinnhold"
          tabIndex={-1}
        >
          {children}
        </main>
        <UserFeedback />
        <SiteFooter />
      </div>
      {(await draftMode()).isEnabled && (
        <>
          <VisualEditing />
          <SanityLive />
          <DisableDraftMode />
        </>
      )}
      <Analytics />
    </>
  );
}
