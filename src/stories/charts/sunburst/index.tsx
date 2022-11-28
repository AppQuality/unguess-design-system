import { ResponsiveSunburst } from "@nivo/sunburst";
import {
  CHARTS_COLOR_SCHEME_CATEGORICAL_8_A,
  DEFAULT_CHARTS_THEME,
} from "../../theme/charts";
import { SunburstChartProps } from "./_types";
import { ChartContainer } from "../ChartContainer";
import { useState } from "react";
import { ThemeContext } from "styled-components";
import React, { useContext } from "react";
import findChildrenByName from "./findChildrenByName";

import CenteredItem from "../pieCenteredItem";
const SunburstChart = ({
  theme,
  colors,
  width,
  height,
  data,
  centerItem,
  margin,
}: SunburstChartProps) => {
  const themeContext = useContext(ThemeContext as React.Context<any>);

  const [currentData, setCurrentData] = useState(data);
  const [currentColor, setCurrentColor] = useState<string | undefined>();

  if (!data.children) return <>No data</>;

  return (
    <ChartContainer width={width} height={height}>
      <ResponsiveSunburst
        theme={{
          ...DEFAULT_CHARTS_THEME,
          ...theme,
        }}
        colors={
          currentColor
            ? () => currentColor
            : colors ?? CHARTS_COLOR_SCHEME_CATEGORICAL_8_A
        }
        borderWidth={4}
        cornerRadius={3}
        layers={[
          "arcs",
          ...(centerItem
            ? [
                (props: any) => (
                  <CenteredItem
                    {...props}
                    fontSizeMultiplier={centerItem.fontSizeMultiplier}
                    theme={themeContext}
                    label={centerItem.label}
                    value={centerItem.value}
                  />
                ),
              ]
            : []),
          ...(currentColor
            ? [
                (props: any) => (
                  <g
                    transform={`translate(${props.centerX - props.radius},${
                      props.centerY - props.radius
                    })`}
                  >
                    <text
                      style={{
                        fontSize:
                          (parseInt(
                            themeContext.fontSizes.md.replace("px", "")
                          ) *
                            props.radius) /
                          160,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setCurrentData(data);
                        setCurrentColor(undefined);
                      }}
                    >
                      {`< Reset`}
                    </text>
                  </g>
                ),
              ]
            : []),
        ]}
        id="name"
        value="value"
        margin={{
          top: 40,
          bottom: 40,
          ...margin,
        }}
        data={currentData}
        childColor={{ from: "color", modifiers: [["opacity", 0.8]] }}
        onClick={(clickedData) => {
          const foundObject = findChildrenByName(
            currentData,
            clickedData.id.toString()
          );
          if (foundObject && foundObject.children) {
            setCurrentData(foundObject);
            setCurrentColor(clickedData.color);
          }
        }}
      />
    </ChartContainer>
  );
};

export { SunburstChart };
