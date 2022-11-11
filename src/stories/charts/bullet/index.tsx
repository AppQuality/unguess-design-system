import { ResponsiveBullet } from "@nivo/bullet";
import { BulletChartDefaultProps, BulletChartProps } from "./_types";
import { chartColors, DEFAULT_CHARTS_THEME } from "../../theme/charts";
import { ChartContainer } from "../ChartContainer";
import { CustomBulletChartMarker } from "./CustomBulletChartMarker";
import { CustomBulletChartRange } from "./CustomBulletChartRange";

const BulletChartDefault = ({
  theme,
  height,
  width,
  lineHeight,
  bulletRadius,
  data,
  ...props
}: BulletChartDefaultProps) => {
  const rangesCount = data[0].ranges.length;

  return (
    <ChartContainer width={width} height={height}>
      <ResponsiveBullet
        data={data}
        theme={{
          ...DEFAULT_CHARTS_THEME,
          ...theme,
        }}
        measureSize={lineHeight || 0.1}
        rangeColors={chartColors.lightGrey}
        measureColors={chartColors.darkGrey}
        markerComponent={(markerProps) => (
          <CustomBulletChartMarker
            bulletRadius={bulletRadius || 4}
            fill={chartColors.darkPine}
            {...markerProps}
          />
        )}
        rangeComponent={({ index, ...rangeProps }) => (
          <CustomBulletChartRange
            fill={chartColors.lightGrey}
            {...rangeProps}
            {...(index + 1 === rangesCount
              ? { width: rangeProps.width + 2 }
              : { width: rangeProps.width })}
          />
        )}
        {...props}
      />
    </ChartContainer>
  );
};

const BulletChart = ({
  theme,
  width,
  height,
  data,
  markerColor,
  markerSize,
  rangeColor,
  measureSize,
  measureColor,
}: BulletChartProps) => {
  const rangesCount = data[0].ranges.length;

  return (
    <ChartContainer width={width} height={height}>
      <ResponsiveBullet
        data={data}
        theme={{
          ...DEFAULT_CHARTS_THEME,
          ...theme,
        }}
        measureColors={measureColor ?? chartColors.darkGrey}
        measureSize={measureSize ?? 0.2}
        markerComponent={({size, ...markerProps}) => (
          <CustomBulletChartMarker
            bulletRadius={4}
            fill={markerColor ?? chartColors.darkPine}
            size={markerSize ?? 0.2}
            {...markerProps}
          />
        )}
        rangeComponent={({ index, ...rangeProps }) => (
          <CustomBulletChartRange
            fill={rangeColor ?? chartColors.lightGrey}
            {...rangeProps}
            {...(index + 1 === rangesCount
              ? { width: rangeProps.width + 2 }
              : { width: rangeProps.width })}
          />
        )}
        margin={{ top: 0, right: 10, bottom: -1, left: 10 }}
      />
    </ChartContainer>
  );
};

export { BulletChart };
