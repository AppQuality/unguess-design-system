import styled from "styled-components";

interface ChartContainerProps {
  width: number;
  height: number;
}

export const ChartContainer = styled.div<ChartContainerProps>`
  height: ${(props) => `${props.height}px` || "300px"};
  width: ${(props) => `${props.width}px` || "100%"};
`;
