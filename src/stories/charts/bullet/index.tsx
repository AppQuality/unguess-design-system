import { ResponsiveBullet } from "@nivo/bullet";
import { BulletChartProps } from "./_types";
import {
  darkPine,
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
      rangeColors={unguessTheme.palette.grey[200]}
      measureColors={unguessTheme.palette.grey[600]}
      markerComponent={markerProps => (<CustomBulletChartMarker bulletRadius={bulletRadius || 4} fill={darkPine[900]} {...markerProps} />)}
      rangeComponent={rangeProps => (<CustomBulletChartRange fill={unguessTheme.palette.grey[200]} {...rangeProps} />)}
      {...props}
    />
  </ChartContainer>
);

export { BulletChart, CustomBulletChartMarker };
