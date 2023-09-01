import React, { ReactNode } from "react";

export type ChartTooltipFunction = ({
  value,
  label,
  data,
}: {
  value: string | number;
  label: string | number;
  data?: Record<string, string | number | ReactNode | undefined>;
}) => React.ReactNode;
