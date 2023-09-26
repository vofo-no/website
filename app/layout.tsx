import "styles/globals.css";

import { Open_Sans, Roboto } from "next/font/google";
import { PropsWithChildren } from "react";

const open_sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-open-sans",
});

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="no" className={`${open_sans.variable} ${roboto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
