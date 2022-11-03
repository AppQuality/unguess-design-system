import { ResponsivePie } from "@nivo/pie";
import {
  CHARTS_COLOR_SCHEME_CATEGORICAL_5,
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
      colors={colors ?? CHARTS_COLOR_SCHEME_CATEGORICAL_5}
      enableArcLabels={false}
      arcLinkLabelsColor={{ from: 'color' }}
      {...props}
    />
  </ChartContainer>
);

export { PieChart };
