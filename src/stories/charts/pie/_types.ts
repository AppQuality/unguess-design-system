import { PieSvgProps } from "@nivo/pie";
import { ChartTooltipFunction } from "../_types";
import { LegendType } from "../Legend";

type BasicPieDatum = {
  id: string | number;
  label?: string | number;
  value: number;
};

type PieDatum = {
  id: string | number;
  label?: string | number;
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
  legend?: LegendType | true;
  arcLinkLabelsSkipAngle?: number;
  labelFormatter?: (
    data: BasicPieDatum & {
      labelPosition: "arclink" | "legend";
      data?: PieDatum;
    }
  ) => string;
}
