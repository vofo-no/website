import "@/app/globals.css";

import {
  Inter as FontSans,
  Libre_Baskerville as FontSerif,
} from "next/font/google";
import { draftMode } from "next/headers";

import { cn } from "@/lib/utils";
import VisualEditing from "@/components/VisualEditing";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const fontSerif = FontSerif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontSerif.variable,
        )}
      >
        {children}
        {draftMode().isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
