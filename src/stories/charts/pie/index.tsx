import { ResponsivePie } from "@nivo/pie";
import {
  CHARTS_COLOR_SCHEME_CATEGORICAL_8_A,
  DEFAULT_CHARTS_THEME,
} from "../../theme/charts";
import { PieChartProps } from "./_types";
import { ChartContainer } from "../ChartContainer";
import { ThemeContext } from "styled-components";
import React, { useContext } from "react";
import CenteredItem from "../pieCenteredItem";
import Legend from "../Legend";

const PieChart = ({
  theme,
  colors,
  width,
  height,
  data,
  centerItem,
  margin,
  tooltip,
  legend,
}: PieChartProps) => {
  const themeContext = useContext(ThemeContext as React.Context<any>);

  return (
    <div>
      <ChartContainer width={width} height={height}>
        <ResponsivePie
          theme={{
            ...{
              ...DEFAULT_CHARTS_THEME,
              ...theme,
              labels: {
                ...theme?.labels,
                text: {
                  fontWeight: themeContext.fontWeights.semibold,
                  fill: themeContext.palette.grey[800],
                  ...theme?.labels?.text,
                },
              },
            },
          }}
          arcLinkLabel={(d) => (d.label || d.id).toString()}
          colors={colors ?? CHARTS_COLOR_SCHEME_CATEGORICAL_8_A}
          enableArcLabels={false}
          arcLinkLabelsColor={{ from: "color" }}
          padAngle={2}
          data={data}
          margin={{
            top: 40,
            bottom: 40,
            ...margin,
          }}
          tooltip={
            tooltip
              ? (node) => {
                  const data = node.datum.data;
                  const label = data?.label || data.id;
                  const value = data.value;
                  return <>{tooltip({ label, value, data })}</>;
                }
              : undefined
          }
          cornerRadius={3}
          innerRadius={0.8}
          arcLinkLabelsThickness={2}
          layers={[
            "arcs",
            "arcLabels",
            "arcLinkLabels",
            ...(centerItem
              ? [
                  (props: any) => (
                    <CenteredItem
                      {...props}
                      theme={themeContext}
                      label={centerItem.label}
                      value={centerItem.value}
                      fontSizeMultiplier={centerItem.fontSizeMultiplier}
                    />
                  ),
                ]
              : []),
          ]}
          activeOuterRadiusOffset={12}
        />
        {legend ? (
          <Legend
            colors={colors ?? CHARTS_COLOR_SCHEME_CATEGORICAL_8_A}
            data={data.map((d) => d.id)}
            columns={typeof legend === "object" ? legend.columns : undefined}
          />
        ) : undefined}
      </ChartContainer>
    </div>
  );
};

export { PieChart };
