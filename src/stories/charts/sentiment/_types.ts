import { ChartTooltipFunction } from "../_types";

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
  width: string;
  height: string;
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  tooltip?: ChartTooltipFunction;
  i18n?: {
    sentimentsValues: {
      veryPositive: string;
      positive: string;
      neutral: string;
      negative: string;
      veryNegative: string;
    };
  };
}
