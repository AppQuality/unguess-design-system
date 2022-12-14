import { ChartTooltipFunction } from "../_types";

type BarData = {
  label: string;
  keys: { [key: string]: number | undefined };
};

export interface BarChartProps {
  data: BarData[];
  width?: string;
  height?: string;
  padding?: number;
  colors?: string[];
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  axisLeftLabel?: string;
  axisBottomLabel?: string;
  tooltip?: ChartTooltipFunction;
}
