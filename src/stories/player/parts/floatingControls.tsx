import styled, { keyframes } from "styled-components";
import { WrapperProps } from "./types";
import { IconButton } from "../../buttons/icon-button";
import { ReactComponent as PauseIcon } from "../../../assets/icons/pause-fill.svg";

export const FloatingContainer = styled.div<WrapperProps>`
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  ${({ isPlaying }) => isPlaying && "display: none;"}
`;

const ButtonFlashTransition = keyframes`
  50% {
    width: 80px;
    height: 80px;
    opacity: 1;
  }
  
  100% {
    width: 80px;
    height: 80px;
    opacity: 0;
  }
`;

const AnimatedPauseButton = styled(IconButton)`
  pointer-events: none;
  min-width: ${({ theme }) => theme.space.base * 15}px;
  width: 0;
  height: 0;
  opacity: 0;
  animation: ${ButtonFlashTransition} 0.4s ease-in;

  > svg {
    width: 90% !important;
    height: 90% !important;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const FloatingControls = (props: { isPlaying?: boolean }) => {
  const { isPlaying } = props;

  return (
    <FloatingContainer isPlaying={isPlaying}>
      <ButtonsContainer>
        {!isPlaying && (
          <AnimatedPauseButton isBright>
            <PauseIcon />
          </AnimatedPauseButton>
        )}
      </ButtonsContainer>
    </FloatingContainer>
  );
};
