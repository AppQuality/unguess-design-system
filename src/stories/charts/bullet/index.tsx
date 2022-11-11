import { ResponsiveBullet, Datum } from "@nivo/bullet";
import { BulletChartProps } from "./_types";
import { chartColors } from "../../theme/charts";
import { ChartContainer } from "../ChartContainer";
import { CustomBulletChartMarker } from "./CustomBulletChartMarker";
import { CustomBulletChartRange } from "./CustomBulletChartRange";
import styled from "styled-components";

const UgBulletChart = styled(ResponsiveBullet)`
  width: 100%;
  height: 100%;
`;

const BulletChart = ({
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

  const formattedData = data.map((item) => ({
    id: "",
    title: "",
    ranges: item.ranges,
    measures: item.measures,
    markers: item.markers,
  })) as Datum[];

  return (
    <ChartContainer width={width} height={height}>
      <UgBulletChart
        data={formattedData}
        measureColors={measureColor ?? chartColors.darkGrey}
        measureSize={measureSize ?? 0.2}
        markerComponent={({ size, ...markerProps }) => (
          <CustomBulletChartMarker
            bulletRadius={4}
            fill={markerColor ?? chartColors.darkPine}
            size={markerSize ?? 1}
            {...markerProps}
          />
        )}
        rangeComponent={({ index, width, ...rangeProps }) => {
          const isLast = index === rangesCount - 1;

          return (
            <CustomBulletChartRange
              fill={rangeColor ?? chartColors.lightGrey}
              {...rangeProps}
              width={isLast ? width + 2 : width}
            />
          );
        }}
        margin={{ top: 0, right: 10, bottom: -1, left: 10 }}
        {...props}
      />
    </ChartContainer>
  );
};

export { BulletChart };
