import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Statistikken finnes ikke",
};

export default function StatisticsNotFound() {
  return (
    <div className="container">
      <div className="bg-blue-100 border-blue-700 border border-dashed mb-12 max-w-screen-sm mx-auto p-6 rounded-xl space-y-3">
        <h2 className="font-semibold text-lg">
          Finner ikke statistikk for dette utvalget
        </h2>
        <p>
          Det kan skyldes lav eller ingen kursaktivitet for kombinasjonen av
          studieforbund, fylke og årstall.
        </p>
        <p>
          <Link
            href="/kontakt"
            className="text-blue-700 hover:text-primary underline font-semibold"
          >
            Ta kontakt
          </Link>{" "}
          for mer informasjon.
        </p>
      </div>
    </div>
  );
}
