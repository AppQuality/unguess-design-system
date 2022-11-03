import { ResponsiveBar } from "@nivo/bar";
import {
  CHARTS_COLOR_SCHEME_BRIGHT,
  DEFAULT_CHARTS_THEME,
} from "../../theme/charts";
import { BarChartProps } from "./_types";
import { ChartContainer } from "../ChartContainer";

const BarChart = ({ theme, colors, width, height, ...props }: BarChartProps) => (
  <ChartContainer width={width} height={height}>
    <ResponsiveBar
      theme={{
        ...DEFAULT_CHARTS_THEME,
        ...theme,
      }}
      colors={colors ?? CHARTS_COLOR_SCHEME_BRIGHT}
      enableLabel={false}
      {...props}
    />
  </ChartContainer>
);

export { BarChart };
