import { SunburstSvgProps } from "@nivo/sunburst";
import { ChartTooltipFunction } from "../_types";
import { LegendType } from "../Legend";

export interface SunburstData {
  name: string;
  label?: string;
  children?: SunburstData[];
  value?: number;
  [key: string]: SunburstData[keyof SunburstData] | string | number | boolean;
}

export interface SunburstChartProps {
  data: SunburstData;
  width?: string;
  height?: string;
  margin?: SunburstSvgProps<SunburstData>["margin"];
  theme?: SunburstSvgProps<SunburstData>["theme"];
  colors?: string[];
  centerItem?: { label?: string; value?: string; fontSizeMultiplier?: number };
  onChange?: (data: SunburstData) => void;
  tooltip?: ChartTooltipFunction;
  legend?: LegendType | true;
}
