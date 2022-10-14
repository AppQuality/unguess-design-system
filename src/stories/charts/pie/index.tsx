import { ResponsivePie } from "@nivo/pie";
import styled from "styled-components";
import { DEFAULT_CHARTS_THEME } from "../../theme/charts";
import { PieChartProps } from "./_types";

interface ChartContainerProps {
  width: number;
  height: number;
}

const ChartContainer = styled.div<ChartContainerProps>`
  height: ${(props) => `${props.height}px` || "300px"};
  width: ${(props) => `${props.width}px` || "100%"};
`;

const PieChart = ({ theme, ...props }: PieChartProps) => (
  <ChartContainer width={props.width} height={props.height}>
    <ResponsivePie
      theme={{
        ...DEFAULT_CHARTS_THEME,
        ...theme,
      }}
      {...props}
    />
  </ChartContainer>
);

export { PieChart };
