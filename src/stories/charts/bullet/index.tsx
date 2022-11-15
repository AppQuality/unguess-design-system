import { BulletMarkersItemProps, ResponsiveBullet } from "@nivo/bullet";
import styled from "styled-components";
import { BulletChartProps } from "./_types";
import { chartColors, DEFAULT_CHARTS_THEME } from "../../theme/charts";
import { ChartContainer } from "../ChartContainer";
import { CustomBulletChartMarkers } from "./CustomBulletChartMarker";
import { CustomMeasure } from "./CustomBulletChartMeasure";

const UgBulletChart = styled(ResponsiveBullet)`
  width: 100%;
  height: 100%;
`;

const BulletChart = ({ width, height, ranges, values }: BulletChartProps) => {
  return (
    <ChartContainer width={width} height={height} id="ciolla">
      <UgBulletChart
        theme={DEFAULT_CHARTS_THEME}
        data={[
          {
            id: "",
            title: "",
            ranges: ranges,
            measures: values,
            markers: values,
          },
        ]}
        measureComponent={CustomMeasure}
        markerColors={chartColors.darkPine}
        markerComponent={({ size, ...markerProps }: BulletMarkersItemProps) => (
          <CustomBulletChartMarkers {...markerProps} size={4} />
        )}
        rangeColors={chartColors.lightGrey}
        rangeBorderColor="white"
        rangeBorderWidth={2}
        margin={{ top: 0, right: 10, bottom: -1, left: 10 }}
      />
    </ChartContainer>
  );
};

export { BulletChart };
