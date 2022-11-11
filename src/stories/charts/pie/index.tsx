import { ResponsivePie } from "@nivo/pie";
import {
  CHARTS_COLOR_SCHEME_CATEGORICAL_8_A,
  DEFAULT_CHARTS_THEME,
} from "../../theme/charts";
import { PieChartProps } from "./_types";
import { ChartContainer } from "../ChartContainer";
import { ThemeContext } from "styled-components";
import { useContext } from "react";
import { theme as globalTheme } from "../../theme";
import { CenteredItem } from "./CenteredItem";

const PieChart = ({
  theme,
  colors,
  width,
  height,
  data,
  centerItem,
  margin,
}: PieChartProps) => {
  const themeContext = useContext(ThemeContext);

  return (
    <div>
      <ChartContainer width={width} height={height}>
        <ResponsivePie
          theme={{
            ...DEFAULT_CHARTS_THEME,
            ...theme,
          }}
          colors={colors ?? CHARTS_COLOR_SCHEME_CATEGORICAL_8_A}
          enableArcLabels={false}
          arcLinkLabelsColor={{ from: "color" }}
          padAngle={1}
          data={data}
          margin={{
            top: 40,
            bottom: 40,
            ...margin,
          }}
          innerRadius={0.8}
          arcLinkLabelsThickness={2}
          arcLinkLabelsTextColor={themeContext.palette.grey[600]}
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
