import { ResponsiveStream } from "@nivo/stream";
import { StreamChartProps } from "./_types";
import {
  CHARTS_COLOR_SCHEME_BRIGHT,
  DEFAULT_CHARTS_THEME,
} from "../../theme/charts";
import { ChartContainer } from "../ChartContainer";

const StreamChart = ({ theme, colors, height, width, ...props }: StreamChartProps) => (
  <ChartContainer width={width} height={height}>
    <ResponsiveStream
      theme={{
        ...DEFAULT_CHARTS_THEME,
        ...theme,
      }}
      colors={colors ?? CHARTS_COLOR_SCHEME_BRIGHT}
      {...props}
    />
  </ChartContainer>
);

export { StreamChart };
