import { ResponsiveBullet } from "@nivo/bullet";
import { BulletChartProps } from "./_types";
import {
  CHARTS_COLOR_SCHEME_MONO,
  DEFAULT_CHARTS_THEME,
} from "../../theme/charts";
import {theme as unguessTheme} from "../../theme";
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
      rangeColors={CHARTS_COLOR_SCHEME_MONO[1]}
      measureColors={unguessTheme.palette.grey[600]}
      markerComponent={markerProps => (<CustomBulletChartMarker bulletRadius={bulletRadius || 4} fill={CHARTS_COLOR_SCHEME_MONO[0]} {...markerProps} />)}
      rangeComponent={rangeProps => (<CustomBulletChartRange fill={CHARTS_COLOR_SCHEME_MONO[1]} {...rangeProps} />)}
      {...props}
    />
  </ChartContainer>
);

export { BulletChart, CustomBulletChartMarker };
