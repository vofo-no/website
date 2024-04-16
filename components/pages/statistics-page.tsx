import data from "@/data/latest.json";
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

const coursesWithLessThan4Participants =
  (
    (data.histogram.find((bar) => bar.label === "0-3") ?? {}) as Record<
      string,
      number
    >
  )[`${data.history[0].aar}`] ?? 0;

export function StatisticsPageLayout() {
  return (
    <>
      <div className="container">
        <PageHeader>
          <PageHeaderHeading>Statistikk</PageHeaderHeading>
          <PageHeaderDescription>
            Studieforbundenes kursaktivitet i {data.history[0].aar}
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
                      data.summary.kurs_bin[0].kurs / data.history[0].kurs,
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
                  value={data.history[0].kurs}
                  old={data.history[1].kurs}
                  label="Antall kurs"
                />
                <MetricWithDiff
                  value={data.history[0].timer}
                  old={data.history[1].timer}
                  label="Deltakere"
                />
                <MetricWithDiff
                  value={data.history[0].timer_median}
                  old={data.history[1].timer_median}
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
                  value={data.history[0].emner}
                  old={data.history[1].emner}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <MetricWithDiff
              label="Korte kurs (inntil 7 dager)"
              value={data.history[0].korte_kurs}
              old={data.history[1].korte_kurs}
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
              value={data.history[0].lange_kurs}
              old={data.history[1].lange_kurs}
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
                <h2>Om deltakerne</h2>
                <p>
                  Vi teller deltakere som har vært med på mer enn 75 % av kurset
                  og som er minst 14 år gamle. Dette betyr at mange kurs har
                  hatt flere deltakere enn det som vises i statistikken.
                </p>
                <p>
                  De fleste kursene hadde om lag{" "}
                  <strong>{data.history[0].deltakere_median} deltakere</strong>.
                  Dette er{" "}
                  {data.history[0].deltakere_median ===
                  data.history[1].deltakere_median ? (
                    "like mange som"
                  ) : data.history[0].deltakere_median >
                    data.history[1].deltakere_median ? (
                    <>
                      <strong>
                        {data.history[0].deltakere_median -
                          data.history[1].deltakere_median}{" "}
                        flere
                      </strong>{" "}
                      siden
                    </>
                  ) : (
                    <>
                      <strong>
                        {data.history[1].deltakere_median -
                          data.history[0].deltakere_median}{" "}
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
                    data.history[1].aar.toString(),
                    data.history[0].aar.toString(),
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
                        coursesWithLessThan4Participants / data.history[0].kurs,
                        { style: "percent" },
                      )}
                      )
                    </>
                  ) : (
                    "Ingen kurs"
                  )}{" "}
                  fikk dispensasjon fra dette kravet.
                </p>
              </div>
            </div>
            <div>
              <MetricWithDiff
                label="Deltakere"
                value={data.history[0].deltakere}
                old={data.history[1].deltakere}
              >
                <ExpandableBarList
                  name="Emne"
                  value="Deltakere"
                  data={data.summary.emner.map((bar) => ({
                    name: topics[String(bar.emne) as keyof typeof topics],
                    value: bar.d,
                  }))}
                />
              </MetricWithDiff>
            </div>
            <div className="md:col-span-2">
              <div className="prose max-w-prose mx-auto">
                <h3>Kjønnsfordeling</h3>
                <p>
                  Det var{" "}
                  <strong>
                    flest{" "}
                    {data.history[0].deltakere_kvinner >
                    data.history[0].deltakere_menn
                      ? "kvinner"
                      : "menn"}
                  </strong>{" "}
                  (
                  {formatNumber(
                    Math.max(
                      data.history[0].deltakere_kvinner,
                      data.history[0].deltakere_menn,
                    ) / data.history[0].deltakere,
                    { style: "percent" },
                  )}
                  ) blant deltakerne på kurs.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <MetricWithDiff
              label="Kvinner"
              value={data.history[0].deltakere_kvinner}
              old={data.history[1].deltakere_kvinner}
            >
              <ExpandableBarList
                name="Emne"
                value="Kvinner"
                data={data.summary.emner.map((bar) => ({
                  name: topics[String(bar.emne) as keyof typeof topics],
                  value: bar.k,
                }))}
              />
            </MetricWithDiff>
            <MetricWithDiff
              label="Menn"
              value={data.history[0].deltakere_menn}
              old={data.history[1].deltakere_menn}
            >
              <ExpandableBarList
                name="Emne"
                value="Menn"
                data={data.summary.emner.map((bar) => ({
                  name: topics[String(bar.emne) as keyof typeof topics],
                  value: bar.m,
                }))}
              />
            </MetricWithDiff>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="prose max-w-prose mx-auto">
                <h3>Aldersfordeling</h3>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <MetricWithDiff
              label="Deltakere 14-19 år"
              value={data.history[0].deltakere_10}
              old={data.history[1].deltakere_10}
            >
              <ExpandableBarList
                name="Emne"
                value="Deltakere"
                data={data.summary.emner.map((bar) => ({
                  name: topics[String(bar.emne) as keyof typeof topics],
                  value: bar.d1,
                }))}
              />
            </MetricWithDiff>
            <MetricWithDiff
              label="Deltakere 20-29 år"
              value={data.history[0].deltakere_20}
              old={data.history[1].deltakere_20}
            >
              <ExpandableBarList
                name="Emne"
                value="Deltakere"
                data={data.summary.emner.map((bar) => ({
                  name: topics[String(bar.emne) as keyof typeof topics],
                  value: bar.d2,
                }))}
              />
            </MetricWithDiff>
            <MetricWithDiff
              label="Deltakere 30-39 år"
              value={data.history[0].deltakere_30}
              old={data.history[1].deltakere_30}
            >
              <ExpandableBarList
                name="Emne"
                value="Deltakere"
                data={data.summary.emner.map((bar) => ({
                  name: topics[String(bar.emne) as keyof typeof topics],
                  value: bar.d3,
                }))}
              />
            </MetricWithDiff>
            <MetricWithDiff
              label="Deltakere 40-49 år"
              value={data.history[0].deltakere_40}
              old={data.history[1].deltakere_40}
            >
              <ExpandableBarList
                name="Emne"
                value="Deltakere"
                data={data.summary.emner.map((bar) => ({
                  name: topics[String(bar.emne) as keyof typeof topics],
                  value: bar.d4,
                }))}
              />
            </MetricWithDiff>
            <MetricWithDiff
              label="Deltakere 50-59 år"
              value={data.history[0].deltakere_50}
              old={data.history[1].deltakere_50}
            >
              <ExpandableBarList
                name="Emne"
                value="Deltakere"
                data={data.summary.emner.map((bar) => ({
                  name: topics[String(bar.emne) as keyof typeof topics],
                  value: bar.d5,
                }))}
              />
            </MetricWithDiff>
            <MetricWithDiff
              label="Deltakere over 60 år"
              value={data.history[0].deltakere_60}
              old={data.history[1].deltakere_60}
            >
              <ExpandableBarList
                name="Emne"
                value="Deltakere"
                data={data.summary.emner.map((bar) => ({
                  name: topics[String(bar.emne) as keyof typeof topics],
                  value: bar.d6,
                }))}
              />
            </MetricWithDiff>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="prose max-w-prose mx-auto">
                <h2>Geografi</h2>
                <p>Studieforbundene har kurs over hele landet.</p>
                <TabBarList
                  variant="solid"
                  name="Fylke"
                  tabs={["Antall kurs", "Etter innbyggertall", "Deltakere"]}
                  values={["Kurs", "Kurs pr. 1000 innbyggere", "Deltakere"]}
                  initial={data.summary.fylker.length}
                  data={data.summary.fylker.map((bar) => ({
                    name: bar.navn,
                    values: [bar.kurs, bar.kurs / (bar.pop / 1000), bar.delt],
                  }))}
                />
              </div>
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
                    tabs={["Antall kurs", "Etter innbyggertall"]}
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
                <h2>Tilskudd og arrangører</h2>
                <p>
                  Tilskuddene til studieforbund fordeles etter antall kurstimer
                  fra tidligere år. Studieforbundet fordeler tilskuddet til
                  organisasjonsledd og medlemsorganisasjoner som holder kurs.
                  Variasjon i aktivitet og ulike prioriteringer er de viktigste
                  forklaringene på hvorfor tilskuddet varierer mellom
                  studieforbund.
                </p>
                <TabBarList
                  variant="solid"
                  name="Studieforbund"
                  tabs={["Timer", "Deltakere", "Kurs", "Statstilskudd"]}
                  initial={data.summary.studieforbund.length}
                  options={[{}, {}, {}, { style: "currency", currency: "NOK" }]}
                  data={data.summary.studieforbund.map((item) => ({
                    name: getOrganizationName(
                      item.sf,
                      null,
                      data.history[0].aar,
                    ),
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
                  value={data.history[0].organisasjoner}
                  old={data.history[1].organisasjoner}
                >
                  <ExpandableBarList
                    name="Organisasjon"
                    value="Kurs"
                    initial={8}
                    data={data.summary.organisasjoner.map((bar) => ({
                      name: getOrganizationName(
                        bar.sf,
                        bar.org,
                        data.history[0].aar,
                      ),
                      value: bar.kurs,
                    }))}
                  />
                </MetricWithDiff>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
