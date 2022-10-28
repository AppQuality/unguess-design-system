import { ResponsiveLine } from "@nivo/line";
import {
  DEFAULT_CHARTS_COLOR_SCHEME,
  DEFAULT_CHARTS_THEME,
} from "../../theme/charts";
import { LineChartProps } from "./_types";
import { ChartContainer } from "../ChartContainer";

const LineChart = ({ theme, colors, width, height, ...props }: LineChartProps) => (
  <ChartContainer width={width} height={height}>
    <ResponsiveLine
      theme={{
        ...DEFAULT_CHARTS_THEME,
        ...theme,
      }}
      colors={colors ?? DEFAULT_CHARTS_COLOR_SCHEME}
      {...props}
    />
  </ChartContainer>
);

export { LineChart };
