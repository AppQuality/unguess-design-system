import { ResponsivePie } from "@nivo/pie";
import {
  CHARTS_COLOR_SCHEME_BRIGHT,
  DEFAULT_CHARTS_THEME,
} from "../../theme/charts";
import { PieChartProps } from "./_types";
import { ChartContainer } from "../ChartContainer";

const PieChart = ({ theme, colors, width, height, ...props }: PieChartProps) => (
  <ChartContainer width={width} height={height}>
    <ResponsivePie
      theme={{
        ...DEFAULT_CHARTS_THEME,
        ...theme,
      }}
      colors={colors ?? CHARTS_COLOR_SCHEME_BRIGHT}
      {...props}
    />
  </ChartContainer>
);

export { PieChart };
