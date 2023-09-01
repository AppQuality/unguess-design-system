import { ChartTooltipFunction } from "../_types";
import { LegendType } from "../Legend";

type SentimentData = {
  id: string;
  data: {
    x: string;
    y?: number;
    custom_data?: string;
  }[];
};

export interface SentimentChartProps {
  data: SentimentData;
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
