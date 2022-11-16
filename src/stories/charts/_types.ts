import React from "react";

export type ChartTooltipFunction = ({
  value,
  label,
}: {
  value: number;
  label: string;
}) => React.ReactNode;
