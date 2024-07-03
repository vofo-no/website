"use client";

import { useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Balance from "react-wrap-balancer";

import { PageHeaderDescriptionInlineSelect } from "@/components/page-header-description-inline-select";

import {
  defaultStatistikkParams,
  parseSlugs,
  resolveStatisticUrl,
  statistikkOptions,
  StatistikkParams,
} from "./utils";

export function Picker() {
  const params = useParams<{ slug?: string[] }>();
  const router = useRouter();

  const slug = parseSlugs(params.slug);

  const goToStatistic = useCallback(
    (changeSet: Partial<StatistikkParams>) => {
      router.push(resolveStatisticUrl(changeSet));
    },
    [router],
  );

  return (
    <Balance className="text-lg sm:text-xl text-center text-muted-foreground">
      <PageHeaderDescriptionInlineSelect
        defaultValue={defaultStatistikkParams.sf}
        selectAllLabel="Alle studieforbund"
        groupLabel="Velg studieforbund"
        value={slug.sf || defaultStatistikkParams.sf}
        onValueChange={(sf) => goToStatistic({ ...slug, sf })}
        options={statistikkOptions.sfs.map((item) => [item.slug, item.name])}
      />{" "}
      sin kursaktivitet i{" "}
      <PageHeaderDescriptionInlineSelect
        defaultValue={defaultStatistikkParams.fylke}
        selectAllLabel="hele landet"
        groupLabel="Velg fylke"
        value={slug.fylke || defaultStatistikkParams.fylke}
        onValueChange={(fylke) => goToStatistic({ ...slug, fylke })}
        options={statistikkOptions.fylker.map((item) => [item.slug, item.name])}
      />{" "}
      for{" "}
      <PageHeaderDescriptionInlineSelect
        defaultValue={defaultStatistikkParams.aar}
        groupLabel="Velg årstall"
        value={slug.aar || defaultStatistikkParams.aar}
        onValueChange={(aar) => goToStatistic({ ...slug, aar })}
        options={statistikkOptions.years}
      />
    </Balance>
  );
}
