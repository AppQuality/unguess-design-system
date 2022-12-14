import { BarTooltipProps } from "@nivo/bar";

type BarData = {
  label: string;
  keys: { [key: string]: number | undefined };
};

export interface BarChartProps {
  data: BarData[];
  width?: string;
  height?: string;
  padding?: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  axisLeftLabel?: string;
  axisBottomLabel?: string;
  tooltip?: React.FC<BarTooltipProps<BarData>>;
}
