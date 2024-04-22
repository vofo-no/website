"use client";

import { DonutChart, Legend } from "@tremor/react";

import { formatNumber } from "@/lib/formatNumber";

interface DonutWithLegendProps {
  category: string;
  index: string;
  data: any[];
}

export function DonutWithLegend(props: DonutWithLegendProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 not-prose">
      <DonutChart {...props} className="w-40" valueFormatter={formatNumber} />
      <Legend
        categories={props.data.map((bin) => bin[props.index])}
        className="max-w-xs"
      />
    </div>
  );
}
