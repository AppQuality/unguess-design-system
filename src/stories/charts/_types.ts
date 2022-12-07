import React from "react";

export type ChartTooltipFunction = ({
  value,
  label,
  data,
}: {
  value: number;
  label: string | number;
  data?: Record<string, string | number | undefined>;
}) => React.ReactNode;
