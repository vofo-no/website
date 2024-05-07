import { Metadata } from "next";
import { draftMode } from "next/headers";
import { Analytics } from "@vercel/analytics/react";

import { AutomaticVisualEditing } from "@/components/automatic-visual-editing";
import { Breadcrumbs } from "@/components/breadcrumbs";
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

export default function WwwLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <Breadcrumbs />
        <main className="flex-1">{children}</main>
        <UserFeedback />
        <SiteFooter />
      </div>
      {draftMode().isEnabled && <AutomaticVisualEditing />}
      <Analytics />
    </>
  );
}
