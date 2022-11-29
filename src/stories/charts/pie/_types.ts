import { PieSvgProps } from "@nivo/pie";
import { ChartTooltipFunction } from "../_types";

interface PieDatum {
  [key: string]: string | number;
}

export interface PieChartProps {
  data: PieDatum[];
  width?: string;
  height?: string;
  theme?: PieSvgProps<PieDatum>["theme"];
  colors?: PieSvgProps<PieDatum>["colors"];
  margin?: PieSvgProps<PieDatum>["margin"];
  centerItem?: { label?: string; value?: string; fontSizeMultiplier?: number };
  tooltip?: ChartTooltipFunction;
}
