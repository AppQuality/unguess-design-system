import { ResponsiveBullet } from "@nivo/bullet";
import { BulletChartProps } from "./_types";
import {
  chartColors,
  DEFAULT_CHARTS_THEME,
} from "../../theme/charts";
import { ChartContainer } from "../ChartContainer";
import { CustomBulletChartMarker } from "./CustomBulletChartMarker";
import { CustomBulletChartRange } from "./CustomBulletChartRange";

const BulletChart = ({ theme, height, width, lineHeight, bulletRadius, ...props }: BulletChartProps) => (
  <ChartContainer width={width} height={height}>
    <ResponsiveBullet
      theme={{
        ...DEFAULT_CHARTS_THEME,
        ...theme,
      }}
      measureSize={lineHeight || .1}
      rangeColors={chartColors.lightGrey}
      measureColors={chartColors.darkGrey}
      markerComponent={markerProps => (<CustomBulletChartMarker bulletRadius={bulletRadius || 4} fill={chartColors.darkPine} {...markerProps} />)}
      rangeComponent={rangeProps => (<CustomBulletChartRange fill={chartColors.lightGrey} {...rangeProps} />)}
      {...props}
    />
  </ChartContainer>
);

export { BulletChart, CustomBulletChartMarker };
