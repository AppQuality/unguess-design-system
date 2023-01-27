import styled from "styled-components";
import { ControlsWrapper } from "./controls";
import { FloatingContainer } from "./floatingControls";
import { WrapperProps } from "../_types";

export const Container = styled.div<WrapperProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  video {
    ${({ isLoaded, isPlaying }) => (!isLoaded || !isPlaying) && "opacity: .7;"}
  }

  ${({ isLoaded }) => !isLoaded && `pointer-events: none;`}

  &:hover {
    ${ControlsWrapper},
    ${FloatingContainer} {
      display: block;
      cursor: pointer;
    }

    ${FloatingContainer} {
      cursor: pointer;

      &:hover & video {
        opacity: 0.7;
      }
    }
  }

  background-color: ${({ theme }) => theme.palette.grey[700]};
`;
