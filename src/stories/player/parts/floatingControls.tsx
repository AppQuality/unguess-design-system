import styled from "styled-components";
import { WrapperProps } from "./types";
import { IconButton } from "../../buttons/icon-button";
import { ReactComponent as PlayIcon } from "../../../assets/icons/play-fill.svg";
import { ReactComponent as PauseIcon } from "../../../assets/icons/pause-fill.svg";

export const FlotatingContainer = styled.div<WrapperProps>`
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  ${({ isPlaying }) => isPlaying && "display: none;"}
`;

const BigButton = styled(IconButton)`
  pointer-events: none;
  min-width: ${({ theme }) => theme.space.base * 15}px;
  width: ${({ theme }) => theme.space.base * 15}px;
  height: ${({ theme }) => theme.space.base * 15}px;

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
    <FlotatingContainer isPlaying={isPlaying}>
      <ButtonsContainer>
        <BigButton isBright>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </BigButton>
      </ButtonsContainer>
    </FlotatingContainer>
  );
};
