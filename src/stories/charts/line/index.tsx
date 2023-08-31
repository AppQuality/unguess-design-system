import { ResponsiveLine, SliceTooltipProps } from "@nivo/line";
import { LineChartProps } from "./_types";
import {
  CHARTS_COLOR_SCHEME_CATEGORICAL,
  DEFAULT_CHARTS_THEME,
} from "../../theme/charts";
import { ChartContainer } from "../ChartContainer";
import styled, { ThemeContext } from "styled-components";
import { MD } from "../../typography/typescale";
import { useContext } from "react";
import { ReactComponent as S0 } from "./assets/sentiment_0.svg";
import { ReactComponent as S1 } from "./assets/sentiment_1.svg";
import { ReactComponent as S2 } from "./assets/sentiment_2.svg";
import { ReactComponent as S3 } from "./assets/sentiment_3.svg";
import { ReactComponent as S4 } from "./assets/sentiment_4.svg";
import { DatumValue } from "@nivo/core";
import { getColor } from "../../theme/utils";
import { Tooltip } from "../../tooltip";

const Point = styled.g`
  transform: translate(-13px, -13px);
`;

const ScrollingContainer = styled.div<{
  isScrollable?: boolean;
}>`
  width: 100%;
  height: 100%;
  position: relative;

  ${({ isScrollable }) =>
    isScrollable &&
    `
    overflow-x: scroll;
  `}

  /* Show dotted lines */
  svg > g > g:nth-child(2) > line {
    stroke-dasharray: 2;
  }

  /* Show first and last vertical lines */
  svg > g > g:first-child > line:first-child {
    transform: translate(2px, 0);
    stroke-dasharray: 2;
  }

  svg > g > g:first-child > line:last-child {
    transform: translate(-2px, 0);
    stroke-dasharray: 2;
  }

  /* Show first and last horizontal lines */
  svg > g > g:nth-child(2) > line:first-child {
    transform: translate(0, -6px);
  }

  svg > g > g:nth-child(2) > line:last-child {
    transform: translate(0, 2px);
  }
`;

const DEFAULT_CHART_MARGINS = { top: 0, right: 0, bottom: 30, left: 30 };

const formatSentiment = (value: DatumValue) => {
  switch (value as number) {
    case 1:
      return "Molto Negativo";
    case 2:
      return "Negativo";
    case 3:
      return "Neutrale";
    case 4:
      return "Positivo";
    case 5:
      return "Molto Positivo";
    default:
      return "";
  }
};

const formatPoint = (value: DatumValue) => {
  switch (value as number) {
    case 1:
      return <S0 />;
    case 2:
      return <S1 />;
    case 3:
      return <S2 />;
    case 4:
      return <S3 />;
    case 5:
      return <S4 />;
    default:
      return "";
  }
};

const formatAxisX = (value: DatumValue) => {
  // This is to avoid printing the first and last value of the axis to make room for the chart (2 empty columns)
  if (!value || value === "start" || value === "end") return "";

  //Print only the first 10 characters
  return (
    <>
      {value.toString().length > 15 ? value.toString().substring(0, 15) + "..." : value.toString()}
      <title>{value as string}</title>
    </>
  );
};

export const LineChart = ({
  data,
  width,
  height,
  margin,
  colors,
  tooltip,
  isScrollable,
}: LineChartProps) => {
  const theme = useContext(ThemeContext as React.Context<any>);

  const actualColors = colors ?? CHARTS_COLOR_SCHEME_CATEGORICAL;
  return (
    <ScrollingContainer
      id="scrolling-container"
      {...(isScrollable && {
        isScrollable: isScrollable
      })}
    >
      <ChartContainer
        width={width}
        height={height}
        id={`chart-container-${data.id}`}
      >
        <ResponsiveLine
          theme={{
            ...DEFAULT_CHARTS_THEME,
            fontSize: theme.fontSizes.sm,
            axis: {
              legend: {
                text: {
                  fill: getColor(theme.colors.primaryHue, 600),
                  fontSize: theme.fontSizes.md,
                },
              },
            },
            grid: {
              line: {
                stroke: theme.palette.grey[400],
                strokeWidth: 1,
              },
            },
          }}
          curve="monotoneX"
          colors={actualColors}
          data={[{
            id: data.id,
            data: [
              {
                x: "start",
              },
              ...data.data,
              {
                x: "end",
              }
            ]
          }
          ]}
          margin={{ ...DEFAULT_CHART_MARGINS, ...margin }}
          gridXValues={1}
          gridYValues={5}
          yScale={{
            type: "linear",
            min: 0,
            max: 6,
          }}
          axisBottom={{
            tickSize: 0,
            tickPadding: 10,
            format: (value) => formatAxisX(value),
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 10,
            format: () => "",
          }}
          pointSymbol={({ datum }) => {
            return <Point>{formatPoint(datum.y ?? "")}</Point>;
          }}
          // tooltip={tooltip ? (node) => {
          //   const point = node.point.data;

          //   return (
          //     <>
          //       {tooltip({
          //         value: formatSentiment(point.y),
          //         label: point.x.toString(),
          //         data: {
          //           custom_data: data.data[node.point.index].custom_data ?? undefined,
          //           yValue: point.y.toString() ?? "",
          //         }
          //       })}
          //     </>
          //   )
          // } : (node) => {
          //   return (
          //     <Tooltip
          //       type="light"
          //       size="large"
          //       content={formatSentiment(node.point.data.y)}
          //     >
          //       <MD>{formatSentiment(node.point.data.y)}</MD>
          //     </Tooltip>
          //   );
          // }}
          sliceTooltip={tooltip ? (e) => {
            const point: SliceTooltipProps["slice"]["points"][number]["data"] & {
              custom_data?: string;
            } = e.slice.points[0].data;

            return (
              <>
                {tooltip({
                  value: formatSentiment(point.y),
                  label: point.xFormatted,
                  data: {
                    customData: point.custom_data ?? undefined,
                    yFormatted: point.yFormatted,
                  }
                })}
              </>
            )
          } : (e) => {
            const point: SliceTooltipProps["slice"]["points"][number]["data"] & {
              custom_data?: string;
            } = e.slice.points[0].data;

            return (
              <Tooltip
                type="light"
                size="large"
                content={formatSentiment(point.y)}
              >
                <MD>{formatSentiment(point.y)}</MD>
              </Tooltip>
            );
          }}
          markers={[
            {
              axis: 'y',
              legend: 'Neutral',
              legendPosition: 'bottom-left',
              lineStyle: {
                stroke: theme.palette.blue[600],
                strokeWidth: 1,
                strokeDasharray: 2,
              },
              textStyle: {
                fill: theme.palette.blue[600],
                fontSize: theme.fontSizes.sm,
              },
              value: 3
            },
            {
              axis: 'y',
              legendPosition: 'bottom-left',
              lineStyle: {
                stroke: "white",
                strokeWidth: 2,
              },
              value: 0
            },
            {
              axis: 'y',
              legendPosition: 'bottom-left',
              lineStyle: {
                stroke: "white",
                strokeWidth: 2,
              },
              value: 6
            },
            {
              axis: 'x',
              legendPosition: 'bottom-left',
              lineStyle: {
                stroke: "white",
                strokeWidth: 2,
              },
              value: "start"
            },
            {
              axis: 'x',
              legendPosition: 'bottom-left',
              lineStyle: {
                stroke: "white",
                strokeWidth: 2,
              },
              value: "end"
            }
          ]}
          enableCrosshair={false}
          isInteractive
          enableSlices="y"
        />
      </ChartContainer>
    </ScrollingContainer>
  );
};
