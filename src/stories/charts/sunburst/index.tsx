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
import {SunburstData} from "./_types"

import CenteredItem from "../pieCenteredItem";
import ResetButton from "./ResetButton";
const SunburstChart = ({
  theme,
  colors,
  width,
  height,
  data,
  centerItem,
  margin,
  onChange,
}: SunburstChartProps) => {
  const themeContext = useContext(ThemeContext as React.Context<any>);

  const [currentData, setCurrentData] = useState(data);
  const [currentColor, setCurrentColor] = useState<string | undefined>();
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const changeDataSlice = ({
    data, color
  }: {data: SunburstData, color?:string}) => {
    setCurrentData(data);
    setCurrentColor(color);
    if (onChange) onChange(currentData);
  }


  if (!data.children) return <>No data</>;

  return (
    <ChartContainer
      width={width}
      height={height}
      style={isHovering ? { cursor: "pointer" } : undefined}
    >
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
        onMouseEnter={(node: any) => {
          if (node.data.children) {
            setIsHovering(true);
          }
        }}
        onMouseLeave={(node: any) => {
          if (node.data.children) {
            setIsHovering(false);
          }
        }}
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
                  <ResetButton
                    centerX={props.centerX}
                    centerY={props.centerY}
                    radius={props.radius}
                    theme={themeContext}
                    onClick={() => {
                      changeDataSlice({
                        data
                      })
                    }}
                  />
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
        childColor={{ from: "color", modifiers: [["brighter", 0.5]] }}
        onClick={(clickedData) => {
          const foundObject = findChildrenByName(
            currentData,
            clickedData.id.toString()
          );
          if (foundObject && foundObject.children) {
            changeDataSlice({
              data: foundObject,
              color:clickedData.color
            })
          }
        }}
      />
    </ChartContainer>
  );
};

export { SunburstChart };
