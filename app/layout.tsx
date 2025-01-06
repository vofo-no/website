import "@/app/globals.css";

import { Inter as FontSans, Gelasio as FontSerif } from "next/font/google";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const fontSerif = FontSerif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="no"
      className="motion-safe:scroll-smooth antialiased"
      suppressHydrationWarning
    >
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontSerif.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
