"use client";

import { useMemo, useState } from "react";
import { BarList, Button } from "@tremor/react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { formatNumber } from "@/lib/formatNumber";

interface ExpandableBarListProps {
  data: { name: string; value: number }[];
  name: string;
  value: string;
  initial?: number;
  formatOptions?: Intl.NumberFormatOptions;
}

const DEFAULT_INITIAL = 4;

export function ExpandableBarList(props: ExpandableBarListProps) {
  const [expanded, setExpanded] = useState(false);

  const expandable = props.data.length > (props.initial ?? DEFAULT_INITIAL);

  const sortedData = useMemo(() => {
    const sorted = props.data.sort((a, b) => b.value - a.value);

    if (expanded || !expandable) return sorted;

    return sorted.slice(0, props.initial || DEFAULT_INITIAL);
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
        valueFormatter={(v: number) => formatNumber(v, props.formatOptions)}
      />
      {expandable && (
        <div className="print:hidden mt-2">
          <Button
            icon={expanded ? ChevronUp : ChevronDown}
            iconPosition="right"
            variant="light"
            size="xs"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Vis mindre" : "Vis mer"}
          </Button>
        </div>
      )}
    </>
  );
}
