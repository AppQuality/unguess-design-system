import { ResponsiveBar } from '@nivo/bar'
import { BarChartProps } from "./_types";
import { CHARTS_COLOR_SCHEME_GRAVITY, DEFAULT_CHARTS_THEME } from "../../theme/charts";
import { theme } from "../../theme";
import { ChartContainer } from "../ChartContainer";

export const BarChart = ({ width, height, data, keys, indexBy, margin, axisBottom, axisLeft }: BarChartProps) => {
  return (
    <ChartContainer width={width} height={height}>
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        theme={{
          ...DEFAULT_CHARTS_THEME,
          axis: {
            domain: {
              line: {
                strokeWidth: 0
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
              }
            }
          },
          grid: {
            line: { strokeDasharray: 2, strokeDashoffset: 2, strokeWidth: 1, stroke: theme.palette.grey[400] }
          },
        }}
        colors={CHARTS_COLOR_SCHEME_GRAVITY}
        layout="horizontal"
        padding={0.3}
        margin={margin || { top: 0, right: 0, bottom: 30, left: 30 }}
        enableGridY={false}
        enableLabel={false}
        enableGridX
        valueScale={{
          type: 'linear',
          nice: true,
        }}
        axisBottom={{
          tickSize: 0,
          tickPadding: 10,
          legend: axisBottom?.legend,
          legendOffset: axisBottom?.offset,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 20,
          legend: axisLeft?.legend,
          legendOffset: axisLeft?.offset,
          legendPosition: 'middle',
        }}
        layers={['bars', 'grid', 'axes']}
      />
    </ChartContainer>
  );
};
