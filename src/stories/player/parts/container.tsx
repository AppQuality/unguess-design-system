import styled from "styled-components";
import { ControlsWrapper } from "./controls";

export const Container = styled.div<{ isLoaded: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  video {
    ${({ isLoaded }) => !isLoaded && "opacity: .5;"}
  }

  &:hover {
    ${ControlsWrapper} {
      display: block;
    }
  }

  background-color: ${({ theme }) => theme.palette.grey[700]};
`;
