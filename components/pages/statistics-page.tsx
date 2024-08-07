import Image from "next/image";
import topics from "@/data/topics.json";
import { StatisticsDataType } from "@/types";
import { Card } from "@tremor/react";

import { formatList } from "@/lib/formatList";
import { formatNumber } from "@/lib/formatNumber";
import getOrganizationName from "@/lib/getOrganizationName";
import { BarChart } from "@/components/ui/charts/bar-chart";
import { DonutWithLegend } from "@/components/ui/charts/donut-with-legend";
import { ExpandableBarList } from "@/components/ui/charts/expandable-bar-list";
import { MetricWithDiff } from "@/components/ui/charts/metric-with-diff";
import { ProgressBarList } from "@/components/ui/charts/progress-bar-list";
import { ProgressCircle } from "@/components/ui/charts/progress-circle";
import { TabBarList } from "@/components/ui/charts/tab-bar-list";

import UndrawGrades from "./undraw_grades_re_j7d6.svg";
import UndrawNavigator from "./undraw_navigator_a479.svg";
import UndrawTeamCollaboration from "./undraw_team_collaboration_re_ow29.svg";

interface StatisticsPageLayoutProps {
  data: StatisticsDataType;
}

interface GeografiSectionProps {
  data: {
    kurs: number;
    pop: number;
    navn: string;
    delt: number;
    tilskudd?: number;
  }[];
  term: "Fylke" | "Kommune";
  missing: { navn: string }[];
  singularSf?: boolean;
  tilskudd?: boolean;
}

function GeografiSection({
  data,
  missing,
  singularSf,
  term,
  tilskudd,
}: GeografiSectionProps) {
  const tabs = tilskudd
    ? ["Kurs", "Etter folketall", "Deltakere", "Tilskudd"]
    : ["Antall kurs", "Etter folketall", "Deltakere"];
  return (
    <>
      <h2>Geografi</h2>
      <p>
        Studieforbund{singularSf ? "et" : "ene"} har kurs over hele{" "}
        {term === "Fylke" ? "landet" : "fylket"}. Totalt sett ble det
        gjennomført{" "}
        <strong>
          flest kurs i {data.sort((a, b) => b.kurs - a.kurs)[0].navn}
        </strong>
        .
      </p>
      <p>
        I forhold til folketallet i de ulike{" "}
        {term === "Fylke" ? "fylkene" : "kommunene"} ble det gjennomført{" "}
        <strong>
          flest kurs pr. innbygger i{" "}
          {data.sort((a, b) => b.kurs / b.pop - a.kurs / a.pop)[0].navn}
        </strong>{" "}
        og{" "}
        <strong>
          færrest kurs pr. innbygger i{" "}
          {data.sort((a, b) => a.kurs / a.pop - b.kurs / b.pop)[0].navn}
        </strong>
        .
      </p>
      {missing.length ? (
        <p>
          Det ble ikke rapportert kurs i{" "}
          {missing.length > 9
            ? `${missing.length} kommuner`
            : `${formatList(
                missing.map((item) => item.navn),
                { type: "disjunction" },
              )} kommune`}
          .
        </p>
      ) : null}
      <TabBarList
        variant="solid"
        name={term}
        tabs={tabs}
        options={[{}, {}, {}, { style: "currency", currency: "NOK" }]}
        values={["Kurs", "Kurs pr. 1000 innbyggere", "Deltakere", "Tilskudd"]}
        initial={15}
        data={data.map((bar) => ({
          name: bar.navn,
          values: [
            bar.kurs,
            bar.kurs / (bar.pop / 1000),
            bar.delt,
            bar.tilskudd || 0,
          ],
        }))}
      />
    </>
  );
}

export async function StatisticsPageLayout({
  data,
}: StatisticsPageLayoutProps) {
  const thisYear = data.history[0];
  const lastYear = data.history[1];
  const coursesWithLessThan4Participants =
    (
      (data.histogram.find((bar) => bar.label === "0-3") ?? {}) as Record<
        string,
        number
      >
    )[`${thisYear.aar}`] ?? 0;

  const totaltTilskudd =
    (data.summary.tilskudd.gt || 0) +
    (data.summary.tilskudd.trt || 0) +
    (data.summary.tilskudd.ot || 0);

  return (
    <div className="container">
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 order-2 md:order-1 prose prose-gray dark:prose-invert mx-auto">
            <h2>Kursaktiviteten</h2>
            <p>
              Statistikken viser kursaktivitet i {data.title ?? "studieforbund"}{" "}
              som er godkjent for statstilskudd. Alle kursene er gjennomført
              etter kravene i voksenopplæringsloven.
            </p>
            <DonutWithLegend
              data={data.summary.kurs_bin}
              category="kurs"
              index="label"
            />
            <p>
              <strong>
                {data.summary.kurs_bin[0].kurs
                  ? formatNumber(
                      data.summary.kurs_bin[0].kurs / thisYear.kurs,
                      {
                        style: "percent",
                      },
                    )
                  : "Ingen"}
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
          <div className="order-1 md:order-2">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-1">
              <MetricWithDiff
                value={thisYear.kurs}
                old={lastYear.kurs}
                label="Antall kurs"
              />
              <MetricWithDiff
                value={thisYear.deltakere}
                old={lastYear.deltakere}
                label="Deltakere"
              />
              <MetricWithDiff
                value={thisYear.timer}
                old={lastYear.timer}
                label="Timer"
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
        <div className="pt-16 pb-8">
          <Image
            src={UndrawTeamCollaboration}
            alt="Tre personer som samarbeider"
            className="w-5/6 max-w-md mx-auto"
          />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 prose prose-gray dark:prose-invert mx-auto">
            <h2>Tilskudd og arrangører</h2>
            {totaltTilskudd > 0 ? (
              <>
                <p>
                  {data.summary.studieforbund.length === 1
                    ? "Studieforbundet"
                    : "Studieforbundene"}{" "}
                  brukte{" "}
                  <strong>
                    {formatNumber(totaltTilskudd, {
                      compactDisplay: "long",
                      notation: "compact",
                      maximumFractionDigits: totaltTilskudd > 999999 ? 1 : 0,
                    })}{" "}
                    kroner
                  </strong>{" "}
                  av statstilskuddet{" "}
                  {data.summary.fylker.length === 1 &&
                    `i ${data.summary.fylker[0].navn}`}{" "}
                  i {thisYear.aar}.
                </p>
                <Card className="not-prose">
                  <div className="flex justify-between gap-2 relative">
                    <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                      Statstilskudd
                    </h3>
                  </div>
                  <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    {formatNumber(totaltTilskudd, {
                      style: "currency",
                      currency: "NOK",
                    })}
                  </p>
                  <div className="mt-6">
                    <ProgressBarList
                      sum={totaltTilskudd}
                      bars={[
                        {
                          name: "Kurstilskudd",
                          value: data.summary.tilskudd.ot,
                        },
                        {
                          name: "Tilrettelegging",
                          value: data.summary.tilskudd.trt,
                        },
                        {
                          name: "Drift og administrasjon",
                          value: data.summary.tilskudd.gt,
                        },
                      ].filter((item) => item.value)}
                    />
                  </div>
                </Card>
              </>
            ) : null}
            <p>
              Tilskuddene til studieforbund fordeles etter antall kurstimer fra
              tidligere år. Studieforbundet fordeler statstilskuddet til sine
              egne organisasjonsledd og medlemsorganisasjoner som holder kurs.
            </p>
            {data.summary.studieforbund.length > 1 ? (
              <TabBarList
                variant="solid"
                name="Studieforbund"
                tabs={
                  data.summary.studieforbund.filter((item) => item.tilskudd)
                    .length
                    ? ["Timer", "Deltakere", "Kurs", "Tilskudd"]
                    : ["Timer", "Deltakere", "Kurs"]
                }
                initial={data.summary.studieforbund.length}
                options={[{}, {}, {}, { style: "currency", currency: "NOK" }]}
                data={data.summary.studieforbund.map((item) => ({
                  name: getOrganizationName(item.sf, null, thisYear.aar),
                  values: [
                    item.timer,
                    item.delt,
                    item.kurs,
                    item.tilskudd ?? 0,
                  ],
                }))}
              />
            ) : (
              <TabBarList
                variant="solid"
                name="Organisasjon"
                tabs={["Timer", "Deltakere", "Kurs"]}
                initial={10}
                options={[{}, {}, {}]}
                data={data.summary.organisasjoner.map((item) => ({
                  name: getOrganizationName(item.sf, item.org, thisYear.aar),
                  values: [item.timer, item.delt, item.kurs],
                }))}
              />
            )}
          </div>
          <div>
            <div className="grid grid-cols-1 gap-6">
              <MetricWithDiff
                label="Organisasjoner"
                value={thisYear.organisasjoner}
                old={lastYear.organisasjoner}
              >
                {data.summary.studieforbund.length > 1 ? (
                  <ExpandableBarList
                    name="Organisasjon"
                    value="Kurs"
                    initial={8}
                    data={data.summary.organisasjoner.map((bar) => ({
                      name: getOrganizationName(bar.sf, bar.org, thisYear.aar),
                      value: bar.kurs,
                    }))}
                  />
                ) : null}
              </MetricWithDiff>
            </div>
          </div>
        </div>
        <div className="pt-16 pb-8">
          <Image src={UndrawGrades} alt="" className="w-5/6 max-w-md mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 prose prose-gray dark:prose-invert mx-auto">
            <h2>Om deltakerne</h2>
            <p>
              Vi teller deltakere som har vært med på mer enn 75 % av kurset og
              som er minst 14 år gamle. Dette betyr at mange kurs har hatt flere
              deltakere enn det som vises i statistikken.
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
                Math.max(thisYear.deltakere_kvinner, thisYear.deltakere_menn) /
                  thisYear.deltakere,
                { style: "percent" },
              )}
              ) blant deltakerne på kurs.
            </p>
            <p>
              De fleste kursene hadde om lag{" "}
              <strong>{thisYear.deltakere_median} deltakere</strong>. Dette er{" "}
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
              categories={[lastYear.aar.toString(), thisYear.aar.toString()]}
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
            <BarChart
              index="name"
              categories={["Deltakere"]}
              data={[
                { name: "14-19 år", Deltakere: thisYear.deltakere_10 },
                { name: "20-29 år", Deltakere: thisYear.deltakere_20 },
                { name: "30-39 år", Deltakere: thisYear.deltakere_30 },
                { name: "40-49 år", Deltakere: thisYear.deltakere_40 },
                { name: "50-59 år", Deltakere: thisYear.deltakere_50 },
                { name: "60+ år", Deltakere: thisYear.deltakere_60 },
              ]}
            />
          </div>
          <div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-1">
              <MetricWithDiff
                label="Deltakere"
                value={thisYear.deltakere}
                old={lastYear.deltakere}
              >
                <div className="my-6">
                  <ProgressBarList
                    sum={thisYear.deltakere}
                    bars={[
                      { name: "Kvinner", value: thisYear.deltakere_kvinner },
                      { name: "Menn", value: thisYear.deltakere_menn },
                    ]}
                  />
                </div>
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
                    tabs={["14-19", "20-29", "30-39", "40-49", "50-59", "60+"]}
                    values={[
                      "Deltakere",
                      "Deltakere",
                      "Deltakere",
                      "Deltakere",
                      "Deltakere",
                      "Deltakere",
                    ]}
                    data={data.summary.emner.map((bar) => ({
                      name: topics[String(bar.emne) as keyof typeof topics],
                      values: [bar.d1, bar.d2, bar.d3, bar.d4, bar.d5, bar.d6],
                    }))}
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
        <div className="pt-16 pb-8">
          <Image
            src={UndrawNavigator}
            alt="En bil som kjører på en lang vei mot et fjell"
            className="w-5/6 max-w-md mx-auto"
          />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 prose prose-gray dark:prose-invert mx-auto">
            {data.summary.kommuner.length > 1 && (
              <GeografiSection
                term={data.summary.fylker.length > 1 ? "Fylke" : "Kommune"}
                missing={data.summary.kommunerMissing}
                data={
                  data.summary.fylker.length > 1
                    ? data.summary.fylker
                    : data.summary.kommuner
                }
                singularSf={data.summary.studieforbund.length === 1}
                tilskudd={
                  data.summary.fylker.length > 1 &&
                  !!data.summary.fylker.filter((item) => item.tilskudd).length
                }
              />
            )}
          </div>
          <div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-1">
              <Card>
                <div className="flex justify-start space-x-5 items-center">
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
                        data.summary.kommuner.length / data.summary.kommunerAll,
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
                {data.summary.fylker.length > 1 ? (
                  <div className="mt-4">
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
                  </div>
                ) : null}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
