import { Metadata } from "next";

import { Konsekvenskart } from "./konsekvenskart";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

export const metadata: Metadata = {
  title: "Konsekvenskartet",
  description:
    "Hva kuttet i tilskuddet til studieforbundene betyr for kurs, kurstimer og deltakere i hvert fylke.",
};

export default function Page() {
  return (
    <div className="container pb-12">
      <PageHeader>
        <PageHeaderHeading>Hva kuttet koster i ditt fylke</PageHeaderHeading>
        <PageHeaderDescription>
          Regjeringen foreslår å kutte tilskuddet til studieforbundene med 69 millioner kroner.
          Kartet viser hva det kan bety for kurs, kurstimer og deltakere i hvert fylke.
        </PageHeaderDescription>
      </PageHeader>

      <Konsekvenskart />
    </div>
  );
}
