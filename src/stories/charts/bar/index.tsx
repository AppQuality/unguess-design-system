import { ResponsiveBar } from "@nivo/bar";
import styled from "styled-components";
import { DEFAULT_CHARTS_THEME } from "../../theme/charts";
import { BarChartProps } from "./_types";

interface ChartContainerProps {
    width: number;
    height: number;
};

const ChartContainer = styled.div<ChartContainerProps>`
  height: ${(props) => `${props.height}px` || "300px"};
  width: ${(props) => `${props.width}px` || "100%"};
`;

const BarChart = ({theme, ...props}: BarChartProps) => (
  <ChartContainer width={props.width} height={props.height}>
    <ResponsiveBar theme={{
      ...DEFAULT_CHARTS_THEME,
      ...theme,
    }} {...props} />
  </ChartContainer>
);

export { BarChart };
