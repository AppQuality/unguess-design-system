import { ResponsivePie } from "@nivo/pie";
import {
  DEFAULT_CHARTS_COLOR_SCHEME,
  DEFAULT_CHARTS_THEME,
} from "../../theme/charts";
import { PieChartProps } from "./_types";
import { ChartContainer } from "../ChartContainer";

const PieChart = ({ theme, colors, ...props }: PieChartProps) => (
  <ChartContainer width={props.width} height={props.height}>
    <ResponsivePie
      theme={{
        ...DEFAULT_CHARTS_THEME,
        ...theme,
      }}
      colors={colors ?? DEFAULT_CHARTS_COLOR_SCHEME}
      {...props}
    />
  </ChartContainer>
);

export { PieChart };
