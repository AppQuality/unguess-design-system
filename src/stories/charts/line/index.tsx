import { ResponsiveLine, Line } from "@nivo/line";
import { LineChartProps } from "./_types";
import {
  CHARTS_COLOR_SCHEME_CATEGORICAL,
  DEFAULT_CHARTS_THEME,
} from "../../theme/charts";
import { ChartContainer } from "../ChartContainer";
import styled, { ThemeContext } from "styled-components";
import { MD } from "../../typography/typescale";
import { useContext } from "react";
import Legend from "../Legend";
import { ReactComponent as S0 } from "./assets/sentiment_0.svg";
import { ReactComponent as S1 } from "./assets/sentiment_1.svg";
import { ReactComponent as S2 } from "./assets/sentiment_2.svg";
import { ReactComponent as S3 } from "./assets/sentiment_3.svg";
import { ReactComponent as S4 } from "./assets/sentiment_4.svg";
import { DatumValue } from "@nivo/core";
import { Button } from "../../buttons/button";
import { Ellipsis } from "../../typography/ellipsis";

const Tooltip = styled.div`
  padding: ${({ theme }) => theme.space.base * 3}px;
  background: ${({ theme }) => theme.palette.white};
  box-shadow: ${({ theme }) => theme.shadows.boxShadow(theme)};
  max-width: 216px;
`;

const DEFAULT_CHART_MARGINS = { top: 0, right: 0, bottom: 30, left: 30 };

const formatSentiment = (value: DatumValue) => {
  switch (value as number) {
    case 0:
      return "Molto Negativo";
    case 1:
      return "Negativo";
    case 2:
      return "Neutrale";
    case 3:
      return "Positivo";
    case 4:
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
  //Print only the first 10 characters
  return (
    <>
      {value.toString().substring(0, 5) + "..."}
      <title>{value as string}</title>
    </>
  );
};

const StyledLine = styled(Line)`
  width: 100%;
  height: 200px;
`;

export const LineChart = ({
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
}: LineChartProps) => {
  const theme = useContext(ThemeContext as React.Context<any>);

  const actualColors = colors ?? CHARTS_COLOR_SCHEME_CATEGORICAL;
  return (
    <>
      <ChartContainer
        width={width}
        height={height}
        style={{ overflow: "scroll" }}
      >
       
        <ResponsiveLine
          data={data}
          
          colors={actualColors}
          // tooltip={
          //   tooltip
          //     ? (node) => <>{tooltip(node)}</>
          //     : ({ id, value, indexValue }) => (
          //         <Tooltip>
          //           <MD>
          //             {indexValue} - {id}:{" "}
          //             <MD tag="span" isBold>
          //               {value}
          //             </MD>
          //           </MD>
          //         </Tooltip>
          //       )
          // }
          margin={{ ...DEFAULT_CHART_MARGINS, ...margin }}
          enableGridX
          gridXValues={1}
          yScale={{
            type: "linear",
            min: 1,
            max: 5,
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
              format: (value) => formatAxisX(value),
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
              format: (value) => "",
            },
          })}
          layers={["grid", "axes", "lines", "points", "legends"]}
          pointSymbol={({ datum, ...props }) => {
            console.log(props);
            return formatPoint(datum.y ?? "");
          }}
        />
      </ChartContainer>
      {/* <ChartContainer width={width} height="auto">
        {legend ? (
          <Legend
            colors={actualColors}
            data={keys}
            {...(typeof legend === "object" && legend)}
          />
        ) : undefined}
      </ChartContainer> */}
    </>
  );
};
