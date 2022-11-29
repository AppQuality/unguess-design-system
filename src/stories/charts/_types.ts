import React from "react";

export type ChartTooltipFunction = ({
  value,
  label,
  data,
}: {
  value: number;
  label: string;
  data?: Record<string, string | number | undefined>;
}) => React.ReactNode;
