import "styles/globals.css";

import { PropsWithChildren } from "react";

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  );
}
