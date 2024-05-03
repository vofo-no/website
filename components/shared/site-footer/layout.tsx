import Link from "next/link";
import { SettingsPayload } from "@/types";
import { MailIcon, MapPinIcon } from "lucide-react";

import { formatPhone } from "@/lib/formatPhone";
import { FooterSponsor } from "@/components/footer-sponsor";
import { SomeIcons } from "@/components/some-icons";

export function SiteFooterLayout(props: { data: SettingsPayload }) {
  const { email, phone, postalAddress, officeAddress, some, about, shortcuts } =
    props.data ?? {};
  return (
    <footer className="mt-6 py-6 border-t border-t-border bg-secondary text-base text-secondary-foreground/60 space-y-4 print:hidden">
      <div className="container flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-xl md:text-2xl leading-tight font-bold">
            Voksenopplæringsforbundet
          </p>
          <p className="text-sm md:text-base leading-tight">
            Studieforbundenes interesseorganisasjon
          </p>
        </div>
        <section className="flex items-center gap-2">
          <h2 className="font-bold">Følg oss:</h2>
          {some?.map(({ title, href }) => {
            const Icon = SomeIcons[title];
            return (
              <Link
                key={href}
                href={href}
                title={title}
                className="hover:text-foreground"
              >
                {Icon && <Icon />}
                <span className={!!Icon && "sr-only"}>{title}</span>
              </Link>
            );
          })}
        </section>
      </div>
      <div className="container flex flex-col items-start gap-4 gap-y-8 md:flex-row md:justify-between">
        <ul className="space-y-2">
          {phone && (
            <li className="flex gap-2 items-center">
              Telefon:{" "}
              <Link
                href={`tel:${phone}`}
                className="underline hover:text-foreground"
              >
                {formatPhone(phone)}
              </Link>
            </li>
          )}
          {email && (
            <li className="flex gap-2 items-center">
              E-post:{" "}
              <Link
                href={`mailto:${email}`}
                className="underline hover:text-foreground"
              >
                {email}
              </Link>
            </li>
          )}
          {postalAddress && (
            <li className="flex gap-2 items-center">
              <MailIcon size={16} aria-label="Postadresse" /> {postalAddress}
            </li>
          )}
          <li className="flex gap-2 items-center">
            <MapPinIcon size={16} aria-label="Adresse" />
            {officeAddress || "<adresse>"}
          </li>
          <li className="flex gap-2 items-center">
            <span>
              <abbr title="Organisasjonsnummer">Org.nr.</abbr>:
            </span>
            <Link
              href="https://w2.brreg.no/enhet/sok/detalj.jsp?orgnr=971454423"
              className="underline hover:text-foreground"
            >
              971 454 423
            </Link>
          </li>
        </ul>
        {shortcuts?.length && (
          <ul className="space-y-2 min-w-[20%]">
            <li>
              <h2 className="font-bold">Snarveier</h2>
            </li>
            {shortcuts.map(({ title, href }) => (
              <li key={href}>
                <Link href={href} className="underline hover:text-foreground">
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <ul className="space-y-2 min-w-[20%]">
          <li>
            <h2 className="font-bold">Om oss</h2>
          </li>
          {about?.map(({ title, href }) => (
            <li key={href}>
              <Link href={href} className="underline hover:text-foreground">
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <FooterSponsor />
    </footer>
  );
}
