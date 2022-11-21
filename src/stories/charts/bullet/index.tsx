import { ResponsiveBullet } from "@nivo/bullet";
import { BulletChartProps } from "./_types";
import { chartColors, DEFAULT_CHARTS_THEME } from "../../theme/charts";
import { ChartContainer } from "../ChartContainer";
import { CustomBulletChartMarker } from "./CustomBulletChartMarker";
import styled from "styled-components";
import { CustomMeasure } from "./CustomBulletChartMeasure";

const UgBulletChart = styled(ResponsiveBullet)`
  width: 100%;
  height: 100%;
`;

const BulletChart = ({
  width,
  height,
  ranges,
  values,
  markerColor,
  markerSize,
  rangeColor,
  measureSize,
  measureColor,
  ...props
}: BulletChartProps) => {
  return (
    <ChartContainer width={width} height={height}>
      <UgBulletChart
        theme={DEFAULT_CHARTS_THEME}
        data={[{
          id: "",
          title: "",
          ranges: ranges,
          measures: values,
          markers: values,
        }]}
        measureComponent={CustomMeasure}
        markerComponent={({ size, ...markerProps }) => (
          <CustomBulletChartMarker
            bulletRadius={4}
            fill={markerColor ?? chartColors.darkPine}
            size={markerSize ?? 1}
            {...markerProps}
          />
        )}
        rangeColors={chartColors.lightGrey}
        rangeBorderColor='#FFFFFF'
        rangeBorderWidth={3}
        margin={{ top: 0, right: 0, bottom: -1, left: 0 }}
        {...props}
      />
    </ChartContainer>
  );
};

export { BulletChart };
