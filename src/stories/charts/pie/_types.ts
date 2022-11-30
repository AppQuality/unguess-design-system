import { PieSvgProps } from "@nivo/pie";
import { ChartTooltipFunction } from "../_types";

type PieDatum = {
  id: string;
  label?: string;
  value: number;
} & {
  [key: string]: string | number | undefined;
};

export interface PieChartProps {
  data: PieDatum[];
  width?: string;
  height?: string;
  theme?: PieSvgProps<PieDatum>["theme"];
  colors?: string[];
  margin?: PieSvgProps<PieDatum>["margin"];
  centerItem?: { label?: string; value?: string; fontSizeMultiplier?: number };
  tooltip?: ChartTooltipFunction;
  legend?:
    | {
        columns?: number;
      }
    | true;
}
