import { useMemo } from "react";
import type dataType from "@/data/latest.json";
import topics from "@/data/topics.json";
import { Card } from "@tremor/react";

import { formatNumber } from "@/lib/formatNumber";
import getOrganizationName from "@/lib/getOrganizationName";
import { BarChart } from "@/components/ui/charts/bar-chart";
import { DonutWithLegend } from "@/components/ui/charts/donut-with-legend";
import { ExpandableBarList } from "@/components/ui/charts/expandable-bar-list";
import { MetricWithDiff } from "@/components/ui/charts/metric-with-diff";
import { ProgressCircle } from "@/components/ui/charts/progress-circle";
import { TabBarList } from "@/components/ui/charts/tab-bar-list";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

import { ProgressBarList } from "../ui/charts/progress-bar-list";

interface StatisticsPageLayoutProps {
  data: typeof dataType & { title?: string };
}

export function StatisticsPageLayout({ data }: StatisticsPageLayoutProps) {
  const thisYear = useMemo(
    () => data.history.sort((a, b) => b.aar - a.aar)[0],
    [data.history],
  );
  const lastYear = useMemo(
    () => data.history.find((a) => a.aar !== thisYear.aar)!,
    [data.history, thisYear.aar],
  );
  const coursesWithLessThan4Participants = useMemo(
    () =>
      (
        (data.histogram.find((bar) => bar.label === "0-3") ?? {}) as Record<
          string,
          number
        >
      )[`${thisYear.aar}`] ?? 0,
    [data.histogram, thisYear.aar],
  );

  return (
    <>
      <div className="container">
        <PageHeader>
          <PageHeaderHeading>
            Statistikk{data.title && ` for ${data.title}`}
          </PageHeaderHeading>
          <PageHeaderDescription>
            Studieforbundenes kursaktivitet i {thisYear.aar}
          </PageHeaderDescription>
        </PageHeader>
      </div>
      <div className="container">
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 order-2 md:order-1">
              <div className="prose max-w-prose mx-auto">
                <h2>Kursaktiviteten</h2>
                <p>
                  Statistikken viser kursaktivitet i studieforbund som er
                  godkjent og får tilskudd fra Kultur- og
                  likestillingsdepartementet. Alle kursene er gjennomført etter
                  kravene i voksenopplæringsloven.
                </p>
                <p>
                  Vofo lager denne statistikken for å fremme kunnskap om
                  studieforbundenes kursvirksomhet, medlemsorganisasjoner og
                  bruk av statstilskudd. Vi bruker data fra Statistisk
                  sentralbyrå (SSB) og fra studieforbundenes offentlige
                  rapportering til Direktoratet for høyere utdanning og
                  kompetanse.
                </p>
                <DonutWithLegend
                  data={data.summary.kurs_bin}
                  category="kurs"
                  index="label"
                />
                <p>
                  <strong>
                    {formatNumber(
                      data.summary.kurs_bin[0].kurs / thisYear.kurs,
                      {
                        style: "percent",
                      },
                    )}
                  </strong>{" "}
                  av kursene ble gjennomført på <strong>én dag</strong>.
                  <br />
                  En fjerdedel av kursene varte i{" "}
                  <strong>
                    mindre enn{" "}
                    {formatNumber(data.summary.dager_q25, {
                      unit: "day",
                      unitDisplay: "long",
                      style: "unit",
                    })}
                  </strong>
                  .
                </p>
                <p>
                  <strong>Halvparten av kursene</strong> ble gjennomført på{" "}
                  <strong>
                    under{" "}
                    {formatNumber(data.summary.dager_median, {
                      unit: "day",
                      unitDisplay: "long",
                      style: "unit",
                    })}
                  </strong>
                  .<br />
                </p>
                <p>
                  En fjerdedel av kursene varte i{" "}
                  <strong>
                    over{" "}
                    {formatNumber(data.summary.dager_q75 / 30, {
                      unit: "month",
                      unitDisplay: "long",
                      style: "unit",
                    })}
                  </strong>
                  .<br /> Det aller <strong>lengste kurset</strong> varte i{" "}
                  <strong>
                    over{" "}
                    {formatNumber(data.summary.dager_maks / 30, {
                      unit: "month",
                      unitDisplay: "long",
                      style: "unit",
                    })}
                  </strong>
                  .
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-1">
                <MetricWithDiff
                  value={thisYear.kurs}
                  old={lastYear.kurs}
                  label="Antall kurs"
                />
                <MetricWithDiff
                  value={thisYear.timer}
                  old={lastYear.timer}
                  label="Deltakere"
                />
                <MetricWithDiff
                  value={thisYear.timer_median}
                  old={lastYear.timer_median}
                  label="Varighet pr. kurs"
                  options={{
                    maximumFractionDigits: 1,
                    unit: "hour",
                    style: "unit",
                    unitDisplay: "long",
                  }}
                />
                <MetricWithDiff
                  label="Kursemner"
                  value={thisYear.emner}
                  old={lastYear.emner}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <MetricWithDiff
              label="Korte kurs (inntil 7 dager)"
              value={thisYear.korte_kurs}
              old={lastYear.korte_kurs}
            >
              <ExpandableBarList
                name="Emne"
                value="Kurs"
                data={data.summary.korte_kurs.map((bar) => ({
                  name: topics[String(bar.emne) as keyof typeof topics],
                  value: bar.kurs,
                }))}
              />
            </MetricWithDiff>
            <MetricWithDiff
              label="Lange kurs (over 7 dager)"
              value={thisYear.lange_kurs}
              old={lastYear.lange_kurs}
            >
              <ExpandableBarList
                name="Emne"
                value="Kurs"
                data={data.summary.lange_kurs.map((bar) => ({
                  name: topics[String(bar.emne) as keyof typeof topics],
                  value: bar.kurs,
                }))}
              />
            </MetricWithDiff>{" "}
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="prose max-w-prose mx-auto">
                <h2>Tilskudd og arrangører</h2>
                <p>
                  Tilskuddene til studieforbund fordeles etter antall kurstimer
                  fra tidligere år. Studieforbundet fordeler statstilskuddet til
                  sine egne organisasjonsledd og medlemsorganisasjoner som
                  holder kurs.
                </p>
                <TabBarList
                  variant="solid"
                  name="Studieforbund"
                  tabs={["Timer", "Deltakere", "Kurs", "Statstilskudd"]}
                  initial={data.summary.studieforbund.length}
                  options={[{}, {}, {}, { style: "currency", currency: "NOK" }]}
                  data={data.summary.studieforbund.map((item) => ({
                    name: getOrganizationName(item.sf, null, thisYear.aar),
                    values: [
                      item.timer,
                      item.delt,
                      item.kurs,
                      item.timer * 100,
                    ],
                  }))}
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-6">
                <MetricWithDiff
                  label="Organisasjoner"
                  value={thisYear.organisasjoner}
                  old={lastYear.organisasjoner}
                >
                  <ExpandableBarList
                    name="Organisasjon"
                    value="Kurs"
                    initial={8}
                    data={data.summary.organisasjoner.map((bar) => ({
                      name: getOrganizationName(bar.sf, bar.org, thisYear.aar),
                      value: bar.kurs,
                    }))}
                  />
                </MetricWithDiff>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="prose max-w-prose mx-auto">
                <h2>Om deltakerne</h2>
                <p>
                  Vi teller deltakere som har vært med på mer enn 75 % av kurset
                  og som er minst 14 år gamle. Dette betyr at mange kurs har
                  hatt flere deltakere enn det som vises i statistikken.
                </p>
                <p>
                  Det var{" "}
                  <strong>
                    flest{" "}
                    {thisYear.deltakere_kvinner > thisYear.deltakere_menn
                      ? "kvinner"
                      : "menn"}
                  </strong>{" "}
                  (
                  {formatNumber(
                    Math.max(
                      thisYear.deltakere_kvinner,
                      thisYear.deltakere_menn,
                    ) / thisYear.deltakere,
                    { style: "percent" },
                  )}
                  ) blant deltakerne på kurs.
                </p>
                <p>
                  De fleste kursene hadde om lag{" "}
                  <strong>{thisYear.deltakere_median} deltakere</strong>. Dette
                  er{" "}
                  {thisYear.deltakere_median === lastYear.deltakere_median ? (
                    "like mange som"
                  ) : thisYear.deltakere_median > lastYear.deltakere_median ? (
                    <>
                      <strong>
                        {thisYear.deltakere_median - lastYear.deltakere_median}{" "}
                        flere
                      </strong>{" "}
                      siden
                    </>
                  ) : (
                    <>
                      <strong>
                        {lastYear.deltakere_median - thisYear.deltakere_median}{" "}
                        færre
                      </strong>{" "}
                      siden
                    </>
                  )}{" "}
                  året før.
                </p>
                <BarChart
                  data={data.histogram}
                  index="label"
                  categories={[
                    lastYear.aar.toString(),
                    thisYear.aar.toString(),
                  ]}
                />
                <p>
                  Det må være minst 4 tellende deltakere på hvert kurs.{" "}
                  {coursesWithLessThan4Participants ? (
                    <>
                      <strong>
                        {formatNumber(coursesWithLessThan4Participants)} kurs
                      </strong>{" "}
                      (
                      {formatNumber(
                        coursesWithLessThan4Participants / thisYear.kurs,
                        { style: "percent" },
                      )}
                      )
                    </>
                  ) : (
                    "Ingen kurs"
                  )}{" "}
                  fikk dispensasjon fra dette kravet.
                </p>
                <h3>Aldersfordeling</h3>
                <ProgressBarList
                  sum={thisYear.deltakere}
                  bars={[
                    { name: "14-19 år", value: thisYear.deltakere_10 },
                    { name: "20-29 år", value: thisYear.deltakere_20 },
                    { name: "30-39 år", value: thisYear.deltakere_30 },
                    { name: "40-49 år", value: thisYear.deltakere_40 },
                    { name: "50-59 år", value: thisYear.deltakere_50 },
                    { name: "60+ år", value: thisYear.deltakere_60 },
                  ]}
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-1">
                <MetricWithDiff
                  label="Deltakere"
                  value={thisYear.deltakere}
                  old={lastYear.deltakere}
                >
                  <ProgressBarList
                    sum={thisYear.deltakere}
                    bars={[
                      { name: "Kvinner", value: thisYear.deltakere_kvinner },
                      { name: "Menn", value: thisYear.deltakere_menn },
                    ]}
                  />
                  <TabBarList
                    variant="line"
                    name="Emne"
                    tabs={["Alle deltakere", "Kvinner", "Menn"]}
                    values={["Deltakere", "Kvinner", "Menn"]}
                    data={data.summary.emner.map((bar) => ({
                      name: topics[String(bar.emne) as keyof typeof topics],
                      values: [bar.d, bar.k, bar.m],
                    }))}
                  />
                </MetricWithDiff>
                <Card>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-tremor-title font-semibold text-tremor- text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      Kursemner etter aldersgruppe
                    </h3>
                    <TabBarList
                      variant="line"
                      name="Emne"
                      tabs={[
                        "14-19",
                        "20-29",
                        "30-39",
                        "40-49",
                        "50-59",
                        "60+",
                      ]}
                      data={data.summary.emner.map((bar) => ({
                        name: topics[String(bar.emne) as keyof typeof topics],
                        values: [
                          bar.d1,
                          bar.d2,
                          bar.d3,
                          bar.d4,
                          bar.d5,
                          bar.d6,
                        ],
                      }))}
                    />
                  </div>
                </Card>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              {data.summary.fylker.length > 1 && (
                <div className="prose max-w-prose mx-auto">
                  <h2>Geografi</h2>
                  <p>
                    Studieforbundene har kurs over hele landet. Totalt sett ble
                    det gjennomført{" "}
                    <strong>
                      flest kurs i{" "}
                      {
                        data.summary.fylker.sort((a, b) => b.kurs - a.kurs)[0]
                          .navn
                      }
                    </strong>
                    .
                  </p>
                  <p>
                    I forhold til folketallet i de ulike fylkene ble det
                    gjennomført{" "}
                    <strong>
                      flest kurs pr. innbygger i{" "}
                      {
                        data.summary.fylker.sort(
                          (a, b) => b.kurs / b.pop - a.kurs / a.pop,
                        )[0].navn
                      }
                    </strong>{" "}
                    og{" "}
                    <strong>
                      færrest kurs pr. innbygger i{" "}
                      {
                        data.summary.fylker.sort(
                          (a, b) => a.kurs / a.pop - b.kurs / b.pop,
                        )[0].navn
                      }
                    </strong>
                    .
                  </p>
                  <TabBarList
                    variant="solid"
                    name="Fylke"
                    tabs={["Antall kurs", "Etter folketall", "Deltakere"]}
                    values={["Kurs", "Kurs pr. 1000 innbyggere", "Deltakere"]}
                    initial={data.summary.fylker.length}
                    data={data.summary.fylker.map((bar) => ({
                      name: bar.navn,
                      values: [bar.kurs, bar.kurs / (bar.pop / 1000), bar.delt],
                    }))}
                  />
                </div>
              )}
            </div>
            <div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-1">
                <Card>
                  <div className="flex justify-start space-x-5 mb-4 items-center">
                    <ProgressCircle
                      value={
                        (data.summary.kommuner.length /
                          data.summary.kommunerAll) *
                        100
                      }
                      label={formatNumber(data.summary.kommuner.length)}
                    />
                    <div>
                      <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                        Kommuner med kurs
                      </h3>
                      <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        {formatNumber(
                          data.summary.kommuner.length /
                            data.summary.kommunerAll,
                          { style: "percent" },
                        )}
                      </p>
                      <p className="text-tremor-default font-medium">
                        <span className="font-normal text-tremor-content dark:text-dark-tremor-content">
                          {data.summary.kommuner.length} av totalt{" "}
                          {data.summary.kommunerAll}
                        </span>
                      </p>
                    </div>
                  </div>
                  <TabBarList
                    variant="line"
                    name="Kommune"
                    tabs={["Antall kurs", "Etter folketall"]}
                    values={["Kurs", "Kurs pr. 1000 innbyggere"]}
                    initial={8}
                    data={data.summary.kommuner.map((bar) => ({
                      name: bar.navn,
                      values: [bar.kurs, bar.kurs / (bar.pop / 1000)],
                    }))}
                  />
                </Card>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="prose max-w-prose mx-auto">
                <h2>Produksjon og kilder</h2>
                <p>Vi bruker ulike kilder for å lage denne statistikken.</p>
                <dl>
                  <dt>
                    <a href="https://www.ssb.no/utdanning/voksenopplaering/statistikk/studieforbundenes-opplaeringsvirksomhet">
                      Studieforbundenes opplæringsvirksomhet (SSB)
                    </a>
                  </dt>
                  <dd>
                    Studieforbundene leverer data til Vofo, som kontrollerer og
                    sammenstiller datasettet sammen med SSB. Inneholder kodet
                    data om alle kurs, herunder emne, kurssted, arrangør,
                    varighet og antall deltakere.
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
                    produseres i dialog med de enkelte studieforbundene og ved å
                    se på årlig rapportering til HK-dir.
                  </dd>
                  <dt>Standard for enmeinndeling for voksenopplæring</dt>
                  <dd>
                    Emneinndeling for voksenopplæring ble utarbeidet av SSB i
                    samarbeid med daværende Kirke-, utdannings- og
                    forskningsdepartementet (KUF), Voksenopplæringsforbundet
                    (Vofo), Norsk Forbund for Fjernundervisning (NFF) og
                    folkehøyskolerådet (FHSR).
                  </dd>
                  <dt>Befolkningsstatistikk</dt>
                  <dd>
                    Folketall for fylker og kommuner hentes fra SSB sin{" "}
                    <a href="https://www.ssb.no/befolkning/folketall/statistikk/befolkning">
                      befolkningsstatistikk
                    </a>{" "}
                    pr. 1. januar det året statistikken gjelder for.
                  </dd>
                  <dt>Fylkesinndeling</dt>
                  <dd>
                    Fylkesinndelingen er basert på SSB sin{" "}
                    <a href="https://www.ssb.no/klass/klassifikasjoner/104">
                      standard for fylkesinndeling
                    </a>
                    . Vi tar utgangspukt i den inndelingen som var gjeldende det
                    året statistikken gjelder for. Dersom fylker er delt eller
                    sammenslått, forsøker vi å korrigere for dette bakover i tid
                    - der dette er mulig - blant annet ved hjelp av
                    kommunenummer.
                  </dd>
                  <dt>Kommuneinndeling</dt>
                  <dd>
                    Kommuneinndelingen er basert på SSB sin{" "}
                    <a href="https://www.ssb.no/klass/klassifikasjoner/131">
                      standard for kommuneinndeling
                    </a>
                    . Vi tar utgangspukt i den inndelingen som var gjeldende det
                    året statistikken gjelder for. Dersom kommuner er delt eller
                    sammenslått, forsøker vi å korrigere for dette bakover i tid
                    - der dette er mulig. For kommuner som er sammenslått, vil
                    vi slå sammen data om de to kommunene bakover i tid. For
                    kommuner som er delt vil ikke dette være mulig, og det vi i
                    så fall kunne mangle data om kommunen fra de årene den var
                    sammenslått.
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
