"use client";

import { useMemo, useState } from "react";
import { BarList } from "@tremor/react";

import { formatNumber } from "@/lib/formatNumber";

interface ExpandableBarListProps {
  data: { name: string; value: number }[];
  name: string;
  value: string;
  initial?: number;
}

export function ExpandableBarList(props: ExpandableBarListProps) {
  const [expanded, setExpanded] = useState(false);

  const expandable = props.data.length > (props.initial ?? 0);

  const sortedData = useMemo(() => {
    const sorted = props.data.sort((a, b) => b.value - a.value);

    if (expanded || !expandable) return sorted;

    return sorted.slice(0, props.initial || 4);
  }, [expandable, expanded, props.data, props.initial]);

  return (
    <>
      <p className="mt-4 text-tremor-default flex items-center justify-between text-tremor-content dark:text-dark-tremor-content">
        <span>{props.name}</span>
        <span>{props.value}</span>
      </p>
      <BarList
        data={sortedData}
        className="mt-2"
        valueFormatter={formatNumber}
      />
      {expandable && (
        <button
          className="text-tremor-default mt-2 print:hidden"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Vis mindre" : "Vis mer"}
        </button>
      )}
    </>
  );
}
