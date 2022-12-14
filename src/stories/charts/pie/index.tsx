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
  arcLinkLabelsSkipAngle,
  labelFormatter,
}: PieChartProps) => {
  const themeContext = useContext(ThemeContext as React.Context<any>);

  return (
    <>
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
          colors={colors ?? CHARTS_COLOR_SCHEME_CATEGORICAL_8_A}
          enableArcLabels={false}
          arcLinkLabelsColor={{ from: "color" }}
          arcLinkLabelsSkipAngle={arcLinkLabelsSkipAngle ?? 10}
          arcLinkLabelsThickness={2}
          arcLinkLabel={(d) =>
            labelFormatter
              ? labelFormatter({
                  label: d.label,
                  id: d.id,
                  value: d.value,
                  data: d.data,
                  labelPosition: "arclink",
                })
              : (d.label || d.id).toString()
          }
          arcLinkLabelsDiagonalLength={8}
          arcLinkLabelsStraightLength={12}
          arcLinkLabelsTextOffset={4}
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
          cornerRadius={2}
          innerRadius={0.8}
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
      </ChartContainer>
      <ChartContainer width={width} height="auto">
        {legend ? (
          <Legend
            colors={colors ?? CHARTS_COLOR_SCHEME_CATEGORICAL_8_A}
            data={data.map((d) =>
              labelFormatter
                ? labelFormatter({
                    label: d.label,
                    id: d.id,
                    value: d.value,
                    data: d,
                    labelPosition: "legend",
                  })
                : d.id.toString()
            )}
            columns={
              typeof legend === "object" && legend.columns
                ? legend.columns
                : undefined
            }
            width={
              typeof legend === "object" && legend.width
                ? legend.width
                : undefined
            }
          />
        ) : undefined}
      </ChartContainer>
    </>
  );
};

export { PieChart };
