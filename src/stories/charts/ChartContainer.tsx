import styled from "styled-components";

export interface ChartContainerProps {
  width?: string;
  height?: string;
}

export const ChartContainer = styled.div<ChartContainerProps>`
  height: ${({ height }) => height || "300px"};
  width: ${({ width }) => width || "100%"};
`;
