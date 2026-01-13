import { ResponsiveBar } from "@nivo/bar";
import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import {
  CHARTS_COLOR_SCHEME_CATEGORICAL,
  DEFAULT_CHARTS_THEME,
} from "../../theme/charts";
import { MD } from "../../typography/typescale";
import { ChartContainer } from "../ChartContainer";
import Legend from "../Legend";
import { BarChartProps } from "./_types";

const Tooltip = styled.div`
  padding: ${({ theme }) => theme.space.base * 3}px;
  background: ${({ theme }) => theme.palette.white};
  box-shadow: ${({ theme }) => theme.shadows.boxShadow()};
  max-width: 216px;
`;

const DEFAULT_CHART_MARGINS = { top: 0, right: 0, bottom: 30, left: 30 };

export const BarChart = ({
  data,
  width,
  height,
  padding,
  margin,
  axisLeftLabel,
  axisBottomLabel,
  colors,
  tooltip,
  legend,
}: BarChartProps) => {
  const theme = useContext(ThemeContext as React.Context<any>);

  const keys = [...new Set(data.map(({ keys }) => Object.keys(keys)).flat())];
  const actualColors = colors ?? CHARTS_COLOR_SCHEME_CATEGORICAL;
  return (
    <>
      <ChartContainer width={width} height={height}>
        <ResponsiveBar
          data={data.map((d) => {
            const { keys, ...rest } = d;
            return {
              ...rest,
              ...keys,
            };
          })}
          keys={keys}
          indexBy="label"
          theme={{
            ...DEFAULT_CHARTS_THEME,
            axis: {
              domain: {
                line: {
                  strokeWidth: 0,
                },
              },
              ticks: {
                text: {
                  fontSize: 12,
                  fill: theme.palette.grey[600],
                },
              },
              legend: {
                text: {
                  fontSize: 14,
                  fontWeight: theme.fontWeights.semibold,
                  fill: theme.palette.blue[600],
                },
              },
            },
            grid: {
              line: {
                strokeDasharray: 2,
                strokeDashoffset: 2,
                strokeWidth: 1,
                stroke: theme.palette.grey[400],
              },
            },
          }}
          colors={actualColors}
          layout="horizontal"
          tooltip={
            tooltip
              ? (node) => <>{tooltip(node)}</>
              : ({ id, value, indexValue }) => (
                  <Tooltip>
                    <MD>
                      {indexValue} - {id}:{" "}
                      <MD tag="span" isBold>
                        {value}
                      </MD>
                    </MD>
                  </Tooltip>
                )
          }
          padding={padding || 0.3}
          margin={{ ...DEFAULT_CHART_MARGINS, ...margin }}
          enableGridY={false}
          enableLabel={false}
          enableGridX
          gridXValues={3}
          valueScale={{
            type: "linear",
            nice: true,
          }}
          {...(axisBottomLabel && {
            axisBottom: {
              tickSize: 0,
              tickPadding: 10,
              tickValues: 3,
              legend: axisBottomLabel,
              legendOffset:
                (margin?.bottom || DEFAULT_CHART_MARGINS.bottom) - 10,
              legendPosition: "middle",
            },
          })}
          {...(axisLeftLabel && {
            axisLeft: {
              tickSize: 0,
              tickPadding: 20,
              legend: axisLeftLabel,
              legendOffset:
                ((margin?.left || DEFAULT_CHART_MARGINS.left) - 10) * -1,
              legendPosition: "middle",
            },
          })}
          layers={["bars", "grid", "axes"]}
        />
      </ChartContainer>
      <ChartContainer width={width} height="auto">
        {legend ? (
          <Legend
            colors={actualColors}
            data={keys}
            {...(typeof legend === "object" && legend)}
          />
        ) : undefined}
      </ChartContainer>
    </>
  );
};
