import React from "react";

export type ChartTooltipFunction = ({
  value,
  label,
  data,
}: {
  value: string | number;
  label: string | number;
  data?: Record<string, string | number | undefined>;
}) => React.ReactNode;
