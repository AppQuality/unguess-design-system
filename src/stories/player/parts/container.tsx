import styled from "styled-components";
import { ControlsWrapper } from "./controls";
import { FloatingContainer } from "./floatingControls";
import { WrapperProps } from "../_types";
import { VideoStyle } from "./video";

export const Container = styled.div<WrapperProps>`
  position: relative;
  ${({ showControls }) =>
    !showControls
      ? `
    display: flex;
    flex-direction: column;
    justify-content: center;
  `
      : `
    margin-bottom: 80px;
  `}
  height: 100%;
  width: 100%;
  video {
    ${({ isLoaded, isPlaying }) => (!isLoaded || !isPlaying) && "opacity: .7;"}
  }

  ${VideoStyle}
  ${({ isLoaded }) => !isLoaded && `pointer-events: none;`}

  &.audio-player-mode {
    height: 74px;

    .player-container video {
      visibility: hidden;

      width: 0;
      height: 0;
    }
  }

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
  background: ${({ theme }) => theme.palette.grey[400]};
`;
