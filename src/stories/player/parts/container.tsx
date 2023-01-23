import styled from "styled-components";
import { ControlsWrapper } from "./controls";
import { FlotatingContainer } from "./floatingControls";
import { WrapperProps } from "./types";

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

  &:hover {
    ${ControlsWrapper},
    ${FlotatingContainer} {
      display: block;
      cursor: pointer;
    }

    ${FlotatingContainer} {
      cursor: pointer;
    }

    video {
      opacity: 0.7;
    }
  }

  background-color: ${({ theme }) => theme.palette.grey[700]};
`;
