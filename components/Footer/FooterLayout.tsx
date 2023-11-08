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
                <ChevronRightIcon className="w-4 h-4 inline-block ml-1" />
              </Link>
            </div>
            <div>
              <Link href="/kalender" className="hover:underline">
                Kalender
                <ChevronRightIcon className="w-4 h-4 inline-block ml-1" />
              </Link>
            </div>
            <div>
              Følg oss: &nbsp;{" "}
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
