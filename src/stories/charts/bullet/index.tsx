import { BulletMarkersItemProps, ResponsiveBullet } from "@nivo/bullet";
import styled from "styled-components";
import { useEffect, useState, createRef } from "react";
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

const useResizeOfReference = () => {
  const ref = createRef<HTMLDivElement>();
  const [, setDimensions] = useState({ width: 0 });
  useEffect(() => {
    if (ref.current) {
      setDimensions({
        width: ref.current.clientWidth,
      });
    }
  }, [ref]);

  return {ref}
}

const BulletChart = ({ width, height, ranges, values }: BulletChartProps) => {
  const {ref} = useResizeOfReference();

  return (
    <ChartContainer width={width} height={height}>
      <div style={{ width: "100%", height: height }} ref={ref}>
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
          animate={false}
          measureComponent={CustomMeasure}
          markerColors={CHARTS_COLOR_PALETTE.darkPine}
          markerComponent={({
            size,
            ...markerProps
          }: BulletMarkersItemProps) => (
            <CustomBulletChartMarkers {...markerProps} size={4} />
          )}
          tooltip={CustomTooltip}
          rangeColors={CHARTS_COLOR_PALETTE.lightGrey}
          rangeBorderColor="white"
          rangeBorderWidth={2}
          margin={{ top: 0, right: 5, bottom: -1, left: 0 }}
        />
      </div>
    </ChartContainer>
  );
};

export { BulletChart };
