import Link from "next/link";
import dataIndex from "@/data/index-v2.json";
import { StatisticsDataType } from "@/types";
import { Card } from "@tremor/react";
import { ArrowRight } from "lucide-react";

import { formatNumber } from "@/lib/formatNumber";
import { resolveHref } from "@/lib/resolveHref";
import { MetricWithDiff } from "@/components/ui/charts/metric-with-diff";
import { ProgressBarList } from "@/components/ui/charts/progress-bar-list";

interface CountyStatisticBriefProps {
  slug: string;
  locale?: string;
}

function localizedTerms(locale?: string): Record<string, string> {
  if (locale === "nn-NO")
    return {
      Deltakere: "Deltakarar",
      "Antall kurs": "Tal på kurs",
      Statstilskudd: "Statstilskot",
      Kurstilskudd: "Kurstilskot",
      Tilrettelegging: "Tilrettelegging",
      "Drift og administrasjon": "Drift og administrasjon",
    };

  return {};
}

export async function CountyStatisticBrief(props: CountyStatisticBriefProps) {
  const index = dataIndex
    .filter((item) => item.fylke === props.slug)
    .sort((a, b) => b.year - a.year)[0];

  if (!dataIndex) return null;

  const year = index.year;

  const data: StatisticsDataType = await fetch(index.url).then((res) =>
    res.json(),
  );

  if (!data) return null;

  const lTerms = localizedTerms(props.locale);
  const t = (term: string) => lTerms[term] || term;

  const totaltTilskudd =
    (data.summary.tilskudd.gt || 0) +
    (data.summary.tilskudd.trt || 0) +
    (data.summary.tilskudd.ot || 0);

  return (
    <section>
      <h2 className="font-serif text-2xl">
        <Link
          href={resolveHref("statistic", `alle/${props.slug}`)!}
          className="text-blue-700 hover:underline"
        >
          Kursstatistikk for {year}
          <ArrowRight className="inline-block ml-1" />
        </Link>
      </h2>
      <div className="grid grid-cols-1 mt-6 gap-6 sm:grid-cols-2 md:grid-cols-1">
        <MetricWithDiff
          value={data.history[0].kurs}
          old={data.history[1].kurs}
          label={t("Antall kurs")}
        />
        <MetricWithDiff
          value={data.history[0].deltakere}
          old={data.history[1].deltakere}
          label={t("Deltakere")}
        />
        {totaltTilskudd > 0 && (
          <Card className="not-prose col-span-full">
            <div className="flex justify-between gap-2 relative">
              <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                {t("Statstilskudd")}
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
                    name: t("Kurstilskudd"),
                    value: data.summary.tilskudd.ot,
                  },
                  {
                    name: t("Tilrettelegging"),
                    value: data.summary.tilskudd.trt,
                  },
                  {
                    name: t("Drift og administrasjon"),
                    value: data.summary.tilskudd.gt,
                  },
                ].filter((item) => item.value)}
              />
            </div>
          </Card>
        )}
      </div>
    </section>
  );
}
