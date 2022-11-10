import { ResponsivePie } from "@nivo/pie";
import {
  CHARTS_COLOR_SCHEME_CATEGORICAL_8_A,
  DEFAULT_CHARTS_THEME,
} from "../../theme/charts";
import { PieChartProps } from "./_types";
import { ChartContainer } from "../ChartContainer";
import { ThemeContext } from "styled-components";
import { useContext } from "react";
import { theme as globalTheme } from "../../theme";

const CustomLayer = ({
  centerX,
  centerY,
  theme,
  radius,
  label,
  value,
}: {
  centerX: number;
  centerY: number;
  radius: number;
  theme: typeof globalTheme;
  label: string;
  value: string;
}) => {
  const parameter = 6;
  const fontSizeFactor = 15 * parameter;
  const spacing = radius / (parameter * 0.9);
  const shift = -radius / (parameter * 3);
  return (
    <>
      <g transform={`translate(${centerX},${centerY})`}>
        <text
          textAnchor="middle"
          baselineShift={shift + spacing}
          style={{
            fontSize:
              (parseInt(theme.fontSizes.md.replace("px", "")) * radius) /
              fontSizeFactor,
            fontWeight: theme.fontWeights.thin,
          }}
        >
          {label}
        </text>
      </g>
      <g transform={`translate(${centerX},${centerY})`}>
        <text
          textAnchor="middle"
          baselineShift={shift - spacing}
          style={{
            fontSize:
              (parseInt(theme.fontSizes.xxl.replace("px", "")) * radius) /
              fontSizeFactor,
            fontWeight: theme.fontWeights.semibold,
          }}
        >
          {value}
        </text>
      </g>
    </>
  );
};

const PieChart = ({
  theme,
  colors,
  width,
  height,
  data,
  centerItem,
}: PieChartProps) => {
  const themeContext = useContext(ThemeContext);

  return (
    <div>
      <ChartContainer width={width} height={height}>
        <ResponsivePie
          theme={{
            ...DEFAULT_CHARTS_THEME,
            ...theme,
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
          innerRadius={0.8}
          arcLinkLabelsThickness={2}
          arcLinkLabelsTextColor={themeContext.palette.grey[600]}
          layers={[
            "arcs",
            "arcLabels",
            "arcLinkLabels",
            "legends",
            ...(centerItem
              ? [
                  (props: any) => (
                    <CustomLayer
                      {...props}
                      theme={themeContext}
                      label={centerItem.label}
                      value={centerItem.value}
                    />
                  ),
                ]
              : []),
          ]}
          activeOuterRadiusOffset={12}
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
        />
      </ChartContainer>
    </div>
  );
};

export { PieChart };
