import { Footer } from "components/Footer";
import { Metadata } from "next";
import { PropsWithChildren } from "react";

import Header from "./Header";

export const metadata: Metadata = {
  title: {
    template: "%s | Voksenopplæringsforbundet",
    default: "Voksenopplæringsforbundet",
  },
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="bg-gray-100">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
