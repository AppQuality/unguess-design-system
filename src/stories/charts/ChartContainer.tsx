import styled from "styled-components";

interface ChartContainerProps {
  width?: string;
  height?: string;
}

export const ChartContainer = styled.div<ChartContainerProps>`
  height: ${(props) => `${props.height}` || "300px"};
  width: ${(props) => `${props.width}` || "100%"};
`;
