import { ResponsivePie } from "@nivo/pie";
import {
  CHARTS_COLOR_SCHEME_CATEGORICAL_8_A,
  DEFAULT_CHARTS_THEME,
} from "../../theme/charts";
import { ChartContainer } from "../ChartContainer";
import { PieChartProps } from "./_types";
import { ThemeContext } from "styled-components";
import { useContext } from "react";

const HalfPieChartComponent = ({
  theme,
  colors,
  width,
  height,
  data,
  onMouseEnter,
  onMouseLeave,
  mode,
  showArcLinks,
  margin,
}: PieChartProps & {
  onMouseEnter?: (props: any) => void;
  onMouseLeave?: (props: any) => void;
  mode: "back" | "front";
}) => {
  const themeContext = useContext(ThemeContext);

  return (
    <div
      style={{
        position: "absolute",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        zIndex: mode === "front" ? 1 : undefined,
        pointerEvents: mode === "front" ? "none" : undefined,
      }}
    >
      <ChartContainer width={width} height={height}>
        <ResponsivePie
          theme={{
            ...DEFAULT_CHARTS_THEME,
            ...theme,
            background: mode === "front" ? "transparent" : undefined,
          }}
          colors={colors ?? CHARTS_COLOR_SCHEME_CATEGORICAL_8_A}
          enableArcLabels={false}
          arcLinkLabelsColor={{ from: "color" }}
          padAngle={2}
          data={data}
          margin={margin}
          innerRadius={mode === "front" ? 0.835 : 0.8}
          arcLinkLabelsThickness={2}
          arcLinkLabelsTextColor={themeContext.palette.grey[600]}
          layers={[
            "arcs",
            ...(showArcLinks
              ? ["arcLabels" as const, "arcLinkLabels" as const]
              : []),
          ]}
          startAngle={-90}
          endAngle={90}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          animate={false}
        />
      </ChartContainer>
    </div>
  );
};

export { HalfPieChartComponent };
