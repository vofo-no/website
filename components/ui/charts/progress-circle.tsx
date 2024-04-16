"use client";

import { ProgressCircle as TProgressCircle } from "@tremor/react";

interface ProgressCircleProps {
  value: number;
  label: string;
}

export function ProgressCircle({ value, label }: ProgressCircleProps) {
  return (
    <TProgressCircle value={value} size="md">
      <span className="text-lg font-medium text-slate-700">{label}</span>
    </TProgressCircle>
  );
}
