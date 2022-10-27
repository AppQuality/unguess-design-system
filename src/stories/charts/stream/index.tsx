import { ResponsiveStream } from "@nivo/stream";
import { StreamChartProps } from "./_types";
import {
  DEFAULT_CHARTS_COLOR_SCHEME,
  DEFAULT_CHARTS_THEME,
} from "../../theme/charts";
import { ChartContainer } from "../ChartContainer";

const StreamChart = ({ theme, colors, ...props }: StreamChartProps) => (
  <ChartContainer width={props.width} height={props.height}>
    <ResponsiveStream
      theme={{
        ...DEFAULT_CHARTS_THEME,
        ...theme,
      }}
      colors={colors ?? DEFAULT_CHARTS_COLOR_SCHEME}
      {...props}
    />
  </ChartContainer>
);

export { StreamChart };
