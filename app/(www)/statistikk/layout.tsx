import Link from "next/link";
import { loadAllCounties, loadAllSfs } from "@/sanity/loader/loadQuery";

import { excludeSlugs } from "./excludeSlugs";

export default async function StatisticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [counties, sfs] = await Promise.all([loadAllCounties(), loadAllSfs()]);

  return (
    <>
      {children}
      <aside className="container mt-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 prose prose-gray dark:prose-invert mx-auto">
            <h2>Andre statistikkrapporter</h2>
            <h3>Rapporter fra Vofo</h3>
            <ul>
              <li>
                <Link href="/statistikk">Statistikk for hele landet</Link>
              </li>
              <li>
                <h4>Fylker</h4>
                <ul>
                  {counties
                    .filter((item) => !excludeSlugs.includes(item.slug))
                    .map((county) => (
                      <li key={county._id}>
                        <Link href={`/statistikk/${county.slug}`}>
                          {county.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
              <li>
                <h4>Studieforbund</h4>
                <ul>
                  {sfs
                    .filter((item) => !excludeSlugs.includes(item.slug))
                    .map((sf) => (
                      <li key={sf._id}>
                        <Link href={`/statistikk/${sf.slug}`}>{sf.title}</Link>
                      </li>
                    ))}
                </ul>
              </li>
            </ul>
            <h3>Studieforbundenes egne kursstatistikker</h3>
            <ul>
              <li>
                <Link href="https://statistikk.vofo.no/k-stud/">
                  Kristelig studieforbund
                </Link>
              </li>
              <li>
                <Link href="https://statistikk.vofo.no/msf/">
                  Musikkens studieforbund
                </Link>
              </li>
              <li>
                <Link href="https://statistikk.vofo.no/funkis/">
                  Studieforbundet Funkis
                </Link>
              </li>
              <li>
                <Link href="https://statistikk.vofo.no/skt/">
                  Studieforbundet kultur og tradisjon
                </Link>
              </li>
              <li>
                <Link href="https://www.sfll.no/kursstatistikk/">
                  Studieforbundet Livslang Læring
                </Link>
              </li>
              <li>
                <Link href="https://statistikk.vofo.no/nm/">
                  Studieforbundet natur og miljø
                </Link>
              </li>
            </ul>
            <h3>Andre</h3>
            <ul>
              <li>
                <Link href="https://www.ssb.no/utdanning/voksenopplaering/statistikk/studieforbundenes-opplaeringsvirksomhet">
                  Studieforbundenes opplæringsvirksomhet fra Statistisk
                  sentralbyrå
                </Link>
              </li>
              <li>
                <Link href="https://www.kompetanseforbundet.no/etter-og-videreutdanningsstatistikk/">
                  Etter- og videreutdanningsstatistikk fra Kompetanseforbundet
                  (viser studieforbundene som får tilskudd fra
                  Kunnskapsdepartementet)
                </Link>
              </li>
            </ul>

            <h2>Produksjon og kilder</h2>
            <p>
              Vofo lager denne statistikken for å fremme kunnskap om
              studieforbundenes kursvirksomhet, medlemsorganisasjoner og bruk av
              statstilskudd. Vi bruker blant annet data fra Statistisk
              sentralbyrå (SSB) og fra studieforbundenes offentlige rapportering
              til Direktoratet for høyere utdanning og kompetanse.
            </p>
            <dl>
              <dt>
                <Link href="https://www.ssb.no/utdanning/voksenopplaering/statistikk/studieforbundenes-opplaeringsvirksomhet">
                  Studieforbundenes opplæringsvirksomhet (SSB)
                </Link>
              </dt>
              <dd>
                Studieforbundene leverer data til Vofo, som kontrollerer og
                sammenstiller datasettet sammen med SSB. Inneholder kodet data
                om alle kurs, herunder emne, kurssted, arrangør, varighet og
                antall deltakere.
              </dd>
              <dt>Offentlig rapportering til HK-dir</dt>
              <dd>
                Studieforbundene rapporterer om virksomheten sin og bruk av
                statstilskudd til HK-dir hvert år. Disse rapportene omfatter
                bl.a. brukt statstilskudd spesifisert på ulike fylker.
              </dd>
              <dt>Navn på studieforbund og organisasjoner</dt>
              <dd>
                Vofo ajourholder egne lister over studieforbundenes navn og
                medlemsorganisasjoner, som brukes til å identifisere
                organisajsoner og studieforbund i statistikken. Listene
                produseres i dialog med de enkelte studieforbundene og ved å se
                på årlig rapportering til HK-dir.
              </dd>
              <dt>Standard for enmeinndeling for voksenopplæring</dt>
              <dd>
                Emneinndeling for voksenopplæring ble utarbeidet av SSB i
                samarbeid med daværende Kirke-, utdannings- og
                forskningsdepartementet (KUF), Voksenopplæringsforbundet (Vofo),
                Norsk Forbund for Fjernundervisning (NFF) og folkehøyskolerådet
                (FHSR).
              </dd>
              <dt>Befolkningsstatistikk</dt>
              <dd>
                Folketall for fylker og kommuner hentes fra SSB sin{" "}
                <Link href="https://www.ssb.no/befolkning/folketall/statistikk/befolkning">
                  befolkningsstatistikk
                </Link>{" "}
                pr. 1. januar det året statistikken gjelder for.
              </dd>
              <dt>Fylkesinndeling</dt>
              <dd>
                Fylkesinndelingen er basert på SSB sin{" "}
                <Link href="https://www.ssb.no/klass/klassifikasjoner/104">
                  standard for fylkesinndeling
                </Link>
                . Vi tar utgangspukt i den inndelingen som var gjeldende det
                året statistikken gjelder for. Dersom fylker er delt eller
                sammenslått, forsøker vi å korrigere for dette bakover i tid -
                der dette er mulig - blant annet ved hjelp av kommunenummer.
              </dd>
              <dt>Kommuneinndeling</dt>
              <dd>
                Kommuneinndelingen er basert på SSB sin{" "}
                <Link href="https://www.ssb.no/klass/klassifikasjoner/131">
                  standard for kommuneinndeling
                </Link>
                . Vi tar utgangspukt i den inndelingen som var gjeldende det
                året statistikken gjelder for. Dersom kommuner er delt eller
                sammenslått, forsøker vi å korrigere for dette bakover i tid -
                der dette er mulig. For kommuner som er sammenslått, vil vi slå
                sammen data om de to kommunene bakover i tid. For kommuner som
                er delt vil ikke dette være mulig, og det vi i så fall kunne
                mangle data om kommunen fra de årene den var sammenslått.
              </dd>
            </dl>
          </div>
        </div>
      </aside>
    </>
  );
}
