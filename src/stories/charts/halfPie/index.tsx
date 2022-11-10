import { ResponsivePie } from "@nivo/pie";
import {
  CHARTS_COLOR_SCHEME_CATEGORICAL_8_A,
  DEFAULT_CHARTS_THEME,
} from "../../theme/charts";
import { PieChartProps } from "./_types";
import { ChartContainer } from "../ChartContainer";
import { ThemeContext } from "styled-components";
import { useContext, useState } from "react";

const HalfPieChartComponent = ({
  theme,
  colors,
  width,
  height,
  data,
  innerRadius,
  onMouseEnter,
  onMouseLeave,
  mode,
}: PieChartProps & {
  innerRadius: number;
  onMouseEnter?: (props: any) => void;
  onMouseLeave?: (props: any) => void;
  mode: "back" | "front";
}) => {
  const themeContext = useContext(ThemeContext);
  return (
    <div
      style={{
        position: "absolute",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        zIndex: mode === "front" ? 1 : undefined,
        pointerEvents: mode === "front" ? "none" : undefined,
      }}
    >
      <ChartContainer width={width} height={height}>
        <ResponsivePie
          theme={{
            ...DEFAULT_CHARTS_THEME,
            ...theme,

            background: mode === "front" ? "transparent" : undefined,
          }}
          colors={colors ?? CHARTS_COLOR_SCHEME_CATEGORICAL_8_A}
          enableArcLabels={false}
          arcLinkLabelsColor={{ from: "color" }}
          padAngle={1}
          data={data}
          margin={{
            top: 40,
            right: 80,
            bottom: 80,
            left: 80,
          }}
          innerRadius={innerRadius}
          arcLinkLabelsThickness={2}
          arcLinkLabelsTextColor={themeContext.palette.grey[600]}
          layers={
            mode === "back"
              ? ["arcs", "arcLabels", "arcLinkLabels", "legends"]
              : ["arcs"]
          }
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 16,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 12,
              symbolShape: "square",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
          startAngle={-90}
          endAngle={90}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          animate={false}
        />
      </ChartContainer>
    </div>
  );
};

const HalfPieChart = ({
  theme,
  colors,
  width,
  height,
  data,
}: PieChartProps) => {
  const activeColors = colors ?? CHARTS_COLOR_SCHEME_CATEGORICAL_8_A;
  const numberOfDataItems = data.length;
  while (activeColors.length < numberOfDataItems) {
    activeColors.push(...activeColors);
  }
  const numberOfColors = activeColors.length;
  const grayOutColors = (index: number) => {
    const newColors = Array(numberOfColors).fill("#e0e0e0");
    newColors[index] = activeColors[index];
    return newColors;
  };
  const [currentColors, setCurrentColors] = useState(grayOutColors(0));

  return (
    <>
      <HalfPieChartComponent
        theme={theme}
        colors={currentColors}
        width={width}
        height={height}
        data={data}
        innerRadius={0.85}
        onMouseEnter={(data) => {
          setCurrentColors(grayOutColors(data.arc.index));
        }}
        onMouseLeave={() => {
          setCurrentColors(grayOutColors(0));
        }}
        mode="front"
      />
      <HalfPieChartComponent
        theme={theme}
        colors={activeColors}
        width={width}
        height={height}
        data={data}
        innerRadius={0.8}
        onMouseEnter={(data) => {
          setCurrentColors(grayOutColors(data.arc.index));
        }}
        onMouseLeave={() => {
          setCurrentColors(grayOutColors(0));
        }}
        mode="back"
      />
    </>
  );
};
export { HalfPieChart };
