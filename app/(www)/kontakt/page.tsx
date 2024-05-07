import Link from "next/link";
import { loadSettings } from "@/sanity/loader/loadQuery";

import { formatPhone } from "@/lib/formatPhone";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Person } from "@/components/shared/person";

export default async function ContactPage() {
  const data = await loadSettings();
  const { email, phone, postalAddress, officeAddress, contacts } = data;

  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Kontakt oss</PageHeaderHeading>
        <PageHeaderDescription>
          Kontaktinformasjon til Vofo
        </PageHeaderDescription>
      </PageHeader>
      <div className="prose prose-gray my-4 max-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <section>
          <h2>Sentralbord</h2>
          {phone && (
            <>
              <h3>Telefon:</h3>
              <p>
                <Link
                  href={`tel:${phone}`}
                  className="underline hover:text-foreground"
                >
                  {formatPhone(phone)}
                </Link>
              </p>
            </>
          )}
          {email && (
            <>
              <h3>E-post:</h3>
              <p>
                <Link href={`mailto:${email}`}>{email}</Link>
              </p>
            </>
          )}
        </section>
        {postalAddress && (
          <section>
            <h2>Postadresse</h2>
            <address className="whitespace-pre-wrap">
              Voksenopplæringsforbundet{"\n"}
              {postalAddress.replace(", ", " \n")}
            </address>
          </section>
        )}
        <section>
          <h2>{postalAddress ? "Besøksadresse" : "Adresse"}</h2>
          <address className="whitespace-pre-wrap">
            Voksenopplæringsforbundet{"\n"}
            {officeAddress?.replace(", ", " \n") || "<adresse>"}
          </address>
        </section>
        <section>
          <h2>Fakturaadresse</h2>
          <p>Leverandører til Vofo skal bruke elektronisk faktura (EHF).</p>
          <h3>Elektronisk fakturaadresse</h3>
          <p>971454423</p>
          <h3>Postadresse for papirfaktura</h3>
          <address className="whitespace-pre-wrap">
            Voksenopplæringsforbundet{"\n"}
            {(postalAddress || officeAddress).replace(", ", " \n")}
          </address>
        </section>
        <section>
          <h2>Organisasjonsnummer</h2>
          <p>
            <Link
              href="https://w2.brreg.no/enhet/sok/detalj.jsp?orgnr=971454423"
              className="underline hover:text-foreground"
            >
              971 454 423
            </Link>
          </p>
        </section>
        {contacts && (
          <section>
            <h2>{contacts.length > 1 ? "Pressekontakter" : "Pressekontakt"}</h2>
            {contacts.map((item) => (
              <Person id={item._ref} key={item._ref} />
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
