import { ResponsiveBar } from "@nivo/bar";
import styled from "styled-components";
import { BarChartProps } from "./_types";

interface ChartContainerProps {
    width: number;
    height: number;
};

const ChartContainer = styled.div<ChartContainerProps>`
  height: ${(props) => `${props.height}px` || "300px"};
  width: ${(props) => `${props.width}px` || "100%"};
`;

const BarChart = (props: BarChartProps) => (
  <ChartContainer width={props.width} height={props.height}>
    <ResponsiveBar {...props} />
  </ChartContainer>
);

export { BarChart };
