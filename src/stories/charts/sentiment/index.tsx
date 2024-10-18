import { DatumValue } from "@nivo/core";
import { ResponsiveLine, SliceTooltipProps } from "@nivo/line";
import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { DEFAULT_CHARTS_THEME } from "../../theme/charts";
import { getColor } from "../../theme/utils";
import { ChartContainer } from "../ChartContainer";
import { SentimentChartProps } from "./_types";
import { ReactComponent as S1 } from "./assets/sentiment_1.svg";
import { ReactComponent as S2 } from "./assets/sentiment_2.svg";
import { ReactComponent as S3 } from "./assets/sentiment_3.svg";
import { ReactComponent as S4 } from "./assets/sentiment_4.svg";
import { ReactComponent as S5 } from "./assets/sentiment_5.svg";

const Point = styled.g`
  transform: translate(-13px, -13px);
`;

const ScrollingContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
`;

const SentimentContainer = styled(ChartContainer)`
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

const formatSentiment = (
  value: DatumValue,
  i18n: SentimentChartProps["i18n"]
) => {
  switch (value as number) {
    case 1:
      return i18n?.sentimentsValues.veryNegative ?? "Very Negative";
    case 2:
      return i18n?.sentimentsValues.negative ?? "Negative";
    case 3:
      return i18n?.sentimentsValues.neutral ?? "Neutral";
    case 4:
      return i18n?.sentimentsValues.positive ?? "Positive";
    case 5:
      return i18n?.sentimentsValues.veryPositive ?? "Very Positive";
    default:
      return "";
  }
};

const formatPoint = (value: DatumValue) => {
  switch (value as number) {
    case 1:
      return <S1 style={{ width: "16px" }} />;
    case 2:
      return <S2 style={{ width: "16px" }} />;
    case 3:
      return <S3 style={{ width: "16px" }} />;
    case 4:
      return <S4 style={{ width: "16px" }} />;
    case 5:
      return <S5 style={{ width: "16px" }} />;
    default:
      return <></>;
  }
};

const formatAxisX = (value: DatumValue) => {
  // This is to avoid printing the first and last value of the axis to make room for the chart (2 empty columns)
  if (!value || value === "start" || value === "end") return "";

  //Print only the first 10 characters
  return value.toString().length > 20
    ? value.toString().substring(0, 20) + "..."
    : value.toString();
};

export const SentimentChart = ({
  data,
  width,
  height,
  margin,
  tooltip,
  i18n,
}: SentimentChartProps) => {
  const theme = useContext(ThemeContext as React.Context<any>);

  return (
    <ScrollingContainer>
      <SentimentContainer
        width={width}
        height={height}
        id="chart-container"
        style={{ overflow: "hidden" }}
      >
        <ResponsiveLine
          theme={{
            ...DEFAULT_CHARTS_THEME,
            text: {
              fontFamily: theme.fonts.system,
              color: theme.palette.grey[600],
              fill: theme.palette.grey[600],
              fontSize: theme.fontSizes.sm,
            },
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
          colors={theme.palette.grey[600]}
          data={[
            {
              id: data.id,
              data: [
                {
                  x: "start",
                },
                ...data.data,
                {
                  x: "end",
                },
              ],
            },
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
          // To use the tooltip, we need to set "useMesh" to true and "enableSlices" to "false"
          tooltip={
            tooltip
              ? (node) => {
                  const point = node.point.data;

                  return (
                    <>
                      {tooltip({
                        value: formatSentiment(point.y, i18n),
                        label: point.x.toString(),
                        data: {
                          customData:
                            data.data[node.point.index].custom_data ??
                            undefined,
                          yValue: point.y.toString() ?? "",
                          icon: formatPoint(point.y),
                          sentimentText: formatSentiment(point.y, i18n),
                        },
                      })}
                    </>
                  );
                }
              : undefined
          }
          sliceTooltip={
            tooltip
              ? (e) => {
                  const point: SliceTooltipProps["slice"]["points"][number]["data"] & {
                    custom_data?: string;
                  } = e.slice.points[0].data;

                  return (
                    <>
                      {tooltip({
                        value: formatSentiment(point.y, i18n),
                        label: point.xFormatted,
                        data: {
                          customData: point.custom_data ?? undefined,
                          yValue: point.yFormatted,
                          icon: formatPoint(point.y),
                          sentimentText: formatSentiment(point.y, i18n),
                        },
                      })}
                    </>
                  );
                }
              : undefined
          }
          markers={[
            {
              axis: "y",
              legend: i18n?.sentimentsValues.neutral ?? "Neutral",
              legendPosition: "bottom-left",
              lineStyle: {
                stroke: theme.palette.blue[600],
                strokeWidth: 1,
                strokeDasharray: 2,
              },
              textStyle: {
                fill: theme.palette.blue[600],
                fontSize: theme.fontSizes.sm,
              },
              value: 3,
            },
            {
              axis: "y",
              legendPosition: "bottom-left",
              lineStyle: {
                stroke: "white",
                strokeWidth: 2,
              },
              value: 0,
            },
            {
              axis: "y",
              legendPosition: "bottom-left",
              lineStyle: {
                stroke: "white",
                strokeWidth: 2,
              },
              value: 6,
            },
            {
              axis: "x",
              legendPosition: "bottom-left",
              lineStyle: {
                stroke: "white",
                strokeWidth: 2,
              },
              value: "start",
            },
            {
              axis: "x",
              legendPosition: "bottom-left",
              lineStyle: {
                stroke: "white",
                strokeWidth: 2,
              },
              value: "end",
            },
          ]}
          enableCrosshair={false}
          isInteractive
          enableSlices="x"
        />
      </SentimentContainer>
    </ScrollingContainer>
  );
};
