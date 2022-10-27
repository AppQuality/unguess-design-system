import { ResponsiveBar } from "@nivo/bar";
import {
  DEFAULT_CHARTS_COLOR_SCHEME,
  DEFAULT_CHARTS_THEME,
} from "../../theme/charts";
import { BarChartProps } from "./_types";
import { ChartContainer } from "../ChartContainer";

const BarChart = ({ theme, colors, ...props }: BarChartProps) => (
  <ChartContainer width={props.width} height={props.height}>
    <ResponsiveBar
      theme={{
        ...DEFAULT_CHARTS_THEME,
        ...theme,
      }}
      colors={colors ?? DEFAULT_CHARTS_COLOR_SCHEME}
      {...props}
    />
  </ChartContainer>
);

export { BarChart };
