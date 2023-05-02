import { BulletMarkersItemProps, ResponsiveBullet } from "@nivo/bullet";
import styled from "styled-components";
import { BulletChartProps } from "./_types";
import { ChartContainer } from "../ChartContainer";
import { CustomBulletChartMarkers } from "./CustomBulletChartMarker";
import { CustomMeasure } from "./CustomBulletChartMeasure";
import { CustomTooltip } from "./CustomTooltip";
import { theme } from "../../theme";

const UgBulletChart = styled(ResponsiveBullet)`
  width: 100%;
  height: 100%;
`;

const BulletChart = ({ width, height, ranges, values }: BulletChartProps) => {
  return (
    <ChartContainer width={width} height={height}>
      <div style={{ width: "100%", height: height }}>
        <UgBulletChart
          data={[
            {
              id: "",
              title: "",
              ranges: ranges,
              measures: values,
              markers: values,
            },
          ]}
          animate={false}
          measureComponent={CustomMeasure}
          markerColors={theme.palette.teal[900]}
          markerComponent={({
            size,
            ...markerProps
          }: BulletMarkersItemProps) => (
            <CustomBulletChartMarkers {...markerProps} size={4} />
          )}
          tooltip={CustomTooltip}
          rangeColors={theme.palette.grey[200]}
          rangeBorderColor="white"
          rangeBorderWidth={2}
          margin={{ top: 0, right: 5, bottom: -1, left: 0 }}
        />
      </div>
    </ChartContainer>
  );
};

export { BulletChart };
