import { PropsWithChildren } from "react";
import { BadgeDelta, Card, Metric } from "@tremor/react";

import { formatNumber } from "@/lib/formatNumber";

function getDeltaType(value: number, old: number) {
  if (value > old) return "increase";
  if (value < old) return "decrease";
  return "unchanged";
}

export function MetricWithDiff({
  label,
  value,
  old,
  options = {},
  children,
}: PropsWithChildren<{
  value: number;
  old: number;
  label: string;
  options?: Intl.NumberFormatOptions;
}>) {
  const mergedOptions: Intl.NumberFormatOptions = {
    maximumFractionDigits: 0,
    ...options,
  };
  const deltaType = getDeltaType(value, old);
  return (
    <Card>
      <div className="flex justify-between gap-2 relative">
        <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          {label}
        </h3>
        <div className="-mt-3 -mr-3">
          <BadgeDelta deltaType={deltaType}>
            {formatNumber(value - old, {
              ...mergedOptions,
              signDisplay: "never",
              style: undefined,
            })}{" "}
            (
            {formatNumber(Math.abs(value - old) / old, {
              signDisplay: "never",
              style: "percent",
            })}
            )
          </BadgeDelta>
        </div>
      </div>
      <Metric>{formatNumber(value, mergedOptions)}</Metric>
      {children}
    </Card>
  );
}
