import { BulletMarkersItemProps, ResponsiveBullet } from "@nivo/bullet";
import styled from "styled-components";
import { BulletChartProps } from "./_types";
import { CHARTS_COLOR_PALETTE, DEFAULT_CHARTS_THEME } from "../../theme/charts";
import { ChartContainer } from "../ChartContainer";
import { CustomBulletChartMarkers } from "./CustomBulletChartMarker";
import { CustomMeasure } from "./CustomBulletChartMeasure";
import { CustomTooltip } from "./CustomTooltip";

const UgBulletChart = styled(ResponsiveBullet)`
  width: 100%;
  height: 100%;
`;

const BulletChart = ({ width, height, ranges, values }: BulletChartProps) => {
  return (
    <ChartContainer width={width} height={height}>
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
        markerColors={CHARTS_COLOR_PALETTE.darkPine}
        markerComponent={({ size, ...markerProps }: BulletMarkersItemProps) => (
          <CustomBulletChartMarkers {...markerProps} size={4} />
        )}
        tooltip={CustomTooltip}
        rangeColors={CHARTS_COLOR_PALETTE.lightGrey}
        rangeBorderColor="white"
        rangeBorderWidth={2}
        margin={{ top: 0, right: 5, bottom: -1, left: 0 }}
      />
    </ChartContainer>
  );
};

export { BulletChart };
