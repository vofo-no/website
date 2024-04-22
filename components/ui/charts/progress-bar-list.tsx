import React from "react";
import { ProgressBar } from "@tremor/react";

import { formatNumber } from "@/lib/formatNumber";

interface ProgressBarListProps {
  sum: number;
  bars: {
    name: string;
    value: number;
  }[];
}

export function ProgressBarList(props: ProgressBarListProps) {
  return (
    <div className="grid grid-cols-[max-content_auto] items-center gap-2 my-6">
      {props.bars.map((bar) => (
        <React.Fragment key={bar.name}>
          <div className="flex gap-3 justify-between not-prose">
            <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              {bar.name}
            </h4>
            <div className="grid grid-cols-[auto_6ch] gap-1 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              <strong className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {formatNumber(bar.value)}
              </strong>
              <span className="text-right">
                ({formatNumber(bar.value / props.sum, { style: "percent" })})
              </span>
            </div>
          </div>
          <div>
            <ProgressBar
              value={(bar.value / props.sum) * 100}
              className="mt-0.5"
            />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
