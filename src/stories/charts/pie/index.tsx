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

const PieChart = ({
  theme,
  colors,
  width,
  height,
  data,
  centerItem,
  margin,
  tooltip,
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
              ? (node) => (
                  <>
                    {tooltip({
                      label: node.datum.data.label.toString(),
                      value:
                        typeof node.datum.data.value === "number"
                          ? node.datum.data.value
                          : parseInt(node.datum.data.value),
                      data: node.datum.data,
                    })}
                  </>
                )
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
      </ChartContainer>
    </div>
  );
};

export { PieChart };
