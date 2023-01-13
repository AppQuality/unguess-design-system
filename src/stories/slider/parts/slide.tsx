import { HTMLAttributes } from "react";
import styled from "styled-components";
import { useSliderContext } from "./sliderContext";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: calc(90vh - 161px);
`;

export const Slide = (props: HTMLAttributes<HTMLDivElement>) => {
  const { sliderH } = useSliderContext();

  if (!sliderH) return null;

  return <StyledDiv {...props} style={{ height: `${sliderH}px` }} />;
};
