import { ResponsiveBullet } from "@nivo/bullet";
import { BulletChartProps } from "./_types";
import { chartColors, DEFAULT_CHARTS_THEME } from "../../theme/charts";
import { ChartContainer } from "../ChartContainer";
import { CustomBulletChartMarker } from "./CustomBulletChartMarker";
import { CustomBulletChartRange } from "./CustomBulletChartRange";
import styled from "styled-components";

const UgBulletChart = styled(ResponsiveBullet)`
  width: 100%;
  height: 100%;
`;

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
  ...props
}: BulletChartProps) => {
  const rangesCount = data[0].ranges.length;

  return (
    <ChartContainer width={width} height={height}>
      <UgBulletChart
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
            size={markerSize ?? 1}
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
        {...props}
      />
    </ChartContainer>
  );
};

export { BulletChart };
