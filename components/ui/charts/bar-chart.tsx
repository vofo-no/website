"use client";

import { BarChart as TBarChart } from "@tremor/react";

import { formatNumber } from "@/lib/formatNumber";

interface BarChartProps {
  data: any[];
  index: string;
  categories: string[];
}

export function BarChart(props: BarChartProps) {
  return (
    <TBarChart
      className="h-60 not-prose"
      valueFormatter={formatNumber}
      {...props}
    />
  );
}
