import styled from "styled-components";
import { WrapperProps } from "../_types";
import { IconButton } from "../../buttons/icon-button";
import { ReactComponent as PlayIconComponent } from "../../../assets/icons/play-fill.svg";

export const FloatingContainer = styled.div<WrapperProps>`
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  ${({ isPlaying }) => isPlaying && "display: none;"}
  z-index: 1;
`;

const PlayIcon = styled(PlayIconComponent)``;
const BigButton = styled(IconButton)`
  pointer-events: none;
  min-width: ${({ theme }) => theme.space.base * 15}px;
  width: 80px;
  height: 80px;
  ${PlayIcon} {
    width: 90%;
    height: 90%;
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
          <BigButton isBright>
            <PlayIcon />
          </BigButton>
        )}
      </ButtonsContainer>
    </FloatingContainer>
  );
};
