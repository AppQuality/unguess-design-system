import { ResponsiveSunburst } from "@nivo/sunburst";
import {
  CHARTS_COLOR_SCHEME_CATEGORICAL_8_A,
  DEFAULT_CHARTS_THEME,
} from "../../theme/charts";
import { SunburstChartProps } from "./_types";
import { ChartContainer } from "../ChartContainer";

const SunburstChart = ({ theme, colors, width, height, ...props }: SunburstChartProps) => (
  <ChartContainer width={width} height={height}>
    <ResponsiveSunburst
      theme={{
        ...DEFAULT_CHARTS_THEME,
        ...theme,
      }}
      colors={colors ?? CHARTS_COLOR_SCHEME_CATEGORICAL_8_A}
      childColor={{
        from: 'color',
        modifiers: [
          [
            'brighter',
            0.5
          ]
        ]
      }}
      {...props}
    />
  </ChartContainer>
);

export { SunburstChart };
