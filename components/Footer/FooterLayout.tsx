import { ChevronRightIcon } from "@heroicons/react/24/outline";
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
    <footer className="bg-gray-800 mt-8 py-8 text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <ul className="flex flex-col gap-4">
            <li className="uppercase font-semibold text-gray-300">
              Voksenopplæringsforbundet
            </li>
            <li>{address}</li>
            <li>
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
            </li>
            <li>
              <a href="#" className="hover:underline">
                Våre regionskontorer
                <ChevronRightIcon className="w-4 h-4 inline-block ml-1" />
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Ansatte
                <ChevronRightIcon className="w-4 h-4 inline-block ml-1" />
              </a>
            </li>
            <li>Organisasjonsnummer: 971 454 423</li>
          </ul>
          <ul className="flex flex-col gap-4">
            <li>
              <p>
                Få siste nytt om studieforbund og voksnes læring hver måned:
              </p>
              <div>
                <form>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="din.epost@eksempel.no"
                      required
                      className="text-base py-1.5 px-3 my-2 bg-gray-900 rounded-md border-gray-600 border"
                    />
                    <button
                      type="submit"
                      className="bg-teal-600 hover:bg-teal-700 px-4 py-2 my-2 rounded-md font-semibold text-white inline-flex gap-2 items-center"
                    >
                      Meld deg på nyhetsbrev
                    </button>
                  </div>
                </form>
              </div>
            </li>
            <li>
              {some?.map(({ title, url }, index) => (
                <React.Fragment key={url}>
                  {index ? <Sep /> : null}
                  <Link key={url} href={url} className="hover:underline">
                    {title}
                  </Link>
                </React.Fragment>
              ))}
            </li>
            <li>
              <a href="/personvern" className="hover:underline">
                Personvern og cookies
                <ChevronRightIcon className="w-4 h-4 inline-block ml-1" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
