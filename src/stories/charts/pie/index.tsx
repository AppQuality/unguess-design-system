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
  label?: string;
  value?: string;
}) => {
  const parameter = 6;
  const fontSizeFactor = radius / (14 * parameter);
  const spacing = radius / (parameter * 0.9);
  const shift = -radius / (parameter * 2.5);
  return (
    <>
      {label && (
        <g transform={`translate(${centerX},${centerY})`}>
          <text
            textAnchor="middle"
            baselineShift={shift + (value ? spacing : spacing / 2)}
            fill={theme.palette.grey[600]}
            style={{
              fontSize:
                parseInt(theme.fontSizes.md.replace("px", "")) * fontSizeFactor,
            }}
          >
            {label}
          </text>
        </g>
      )}
      {value && (
        <g transform={`translate(${centerX},${centerY})`}>
          <text
            textAnchor="middle"
            baselineShift={shift - (label ? spacing : spacing / 2)}
            fill={theme.palette.blue[600]}
            style={{
              fontSize:
                parseInt(theme.fontSizes.xxl.replace("px", "")) *
                fontSizeFactor,
              fontWeight: theme.fontWeights.semibold,
            }}
          >
            {value}
          </text>
        </g>
      )}
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
            bottom: 80,
          }}
          innerRadius={0.8}
          arcLinkLabelsThickness={2}
          arcLinkLabelsTextColor={themeContext.palette.grey[600]}
          layers={[
            "arcs",
            "arcLabels",
            "arcLinkLabels",
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
        />
      </ChartContainer>
    </div>
  );
};

export { PieChart };
