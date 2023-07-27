import { ChartTooltipFunction } from "../_types";
import { LegendType } from "../Legend";

type LineData = {
  id: string;
  data: {
    x: string;
    y: number;
  }[];
};

export interface LineChartProps {
  data: LineData[];
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
  legend?: LegendType | true;
}
