import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Container from "components/Container";
import formatPhoneNumber from "lib/formatPhoneNumber";
import Link from "next/link";
import React from "react";
import { SettingsPayload } from "types";

interface FooterProps {
  data: SettingsPayload;
}

const Sep = () => <span className="inline-block px-3 opacity-50">|</span>;

export default function Footer({ data }: FooterProps) {
  const { address, phone, email, some } = data ?? {};

  return (
    <footer className="bg-gray-800 py-4 text-white dark">
      <Container prose className="px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <div className="uppercase font-semibold text-gray-300">
              Voksenopplæringsforbundet
            </div>
            <address className="not-italic">{address}</address>
            <address className="not-italic">
              Telefon:{" "}
              <Link href={`tel:+47${phone}`} className="hover:underline">
                {formatPhoneNumber(phone || "")}
              </Link>
              <br />
              E-post:{" "}
              <Link href={`mailto:${email}`} className="hover:underline">
                {email}
              </Link>
            </address>
            <div className="print:hidden">
              <a href="/om-vofo/#ansatte" className="hover:underline">
                Våre ansatte
                <ChevronRightIcon className="w-4 h-4 inline-block ml-1" />
              </a>
            </div>
            <div>
              Organisasjonsnummer:{" "}
              <Link href="https://w2.brreg.no/enhet/sok/detalj.jsp?orgnr=971454423">
                971 454 423
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4 print:hidden">
            <div>
              <Link href="/arkiv" className="hover:underline">
                Dokument- og nyhetsarkiv
              </Link>
              <Sep />
              <Link href="/kalender" className="hover:underline">
                Kalender
              </Link>
            </div>
            <div>
              Få siste nytt om studieforbund og voksnes læring hver måned:
              <form>
                <div className="flex flex-wrap mt-2 gap-2">
                  <input
                    type="email"
                    placeholder="din.epost@eksempel.no"
                    required
                    className="py-1.5 px-3 bg-gray-900 rounded-md border-gray-600 border"
                  />
                  <button
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-md font-semibold text-white inline-flex items-center overflow-ellipsis whitespace-nowrap overflow-hidden"
                  >
                    Meld deg på nyhetsbrev
                  </button>
                </div>
              </form>
            </div>
            <div>
              {some?.map(({ title, url }, index) => (
                <React.Fragment key={url}>
                  {index ? <Sep /> : null}
                  <Link key={url} href={url} className="hover:underline">
                    {title}
                  </Link>
                </React.Fragment>
              ))}
            </div>
            <div>
              <a href="/personvern" className="hover:underline">
                Personvern og cookies
                <ChevronRightIcon className="w-4 h-4 inline-block ml-1" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
