import { ResponsiveBar } from "@nivo/bar";
import { BarChartProps } from "./_types";
import {
  CHARTS_COLOR_SCHEME_GRAVITY,
  DEFAULT_CHARTS_THEME,
} from "../../theme/charts";
import { ChartContainer } from "../ChartContainer";
import styled, { ThemeContext } from "styled-components";
import { MD } from "../../typography/typescale";
import { useContext } from "react";

const Tooltip = styled.div`
  padding: ${({ theme }) => theme.space.base * 3}px;
  background: ${({ theme }) => theme.palette.white};
  box-shadow: ${({ theme }) => theme.shadows.boxShadow(theme)};
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
}: BarChartProps) => {
  const theme = useContext(ThemeContext as React.Context<any>);

  return (
    <ChartContainer width={width} height={height}>
      <ResponsiveBar
        data={data.map((d) => {
          const { keys, ...rest } = d;
          return {
            ...rest,
            ...keys,
          };
        })}
        keys={[...new Set(data.map(({ keys }) => Object.keys(keys)).flat())]}
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
        colors={colors ?? CHARTS_COLOR_SCHEME_CATEGORICAL_8_A}
        layout="horizontal"
        tooltip={({ id, value, indexValue }) => (
          <Tooltip>
            <MD>
              {indexValue} - {id}:{" "}
              <MD tag="span" isBold>
                {value}
              </MD>
            </MD>
          </Tooltip>
        )}
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
            legendOffset: (margin?.bottom || DEFAULT_CHART_MARGINS.bottom) - 10,
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
  );
};
