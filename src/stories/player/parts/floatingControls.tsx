import styled from "styled-components";
import { IconButton } from "../../buttons/icon-button";
import { WrapperProps } from "../_types";
import { ReactComponent as PlayIconComponent } from "../assets/play-icon.svg";

export const FloatingContainer = styled.div<WrapperProps>`
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  ${({ isPlaying }) => isPlaying && "display: none;"}
  ${({ showControls }) =>
    showControls ? "height: 100%" : "height: calc(100% - 80px)"};
`;

const PlayIcon = styled(PlayIconComponent)``;
const BigButton = styled(IconButton)`
  pointer-events: none;
  background-color: ${({ theme }) => theme.palette.white};
  min-width: ${({ theme }) => theme.space.base * 15}px;
  width: 80px;
  height: 80px;

  box-shadow: ${({ theme }) => theme.shadows.boxShadow()};

  ${PlayIcon} {
    width: 60%;
    height: 60%;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const FloatingControls = (props: {
  isPlaying?: boolean;
  showControls?: boolean;
  onClick?: () => void;
}) => {
  const { isPlaying, showControls, onClick } = props;

  return (
    <FloatingContainer
      isPlaying={isPlaying}
      showControls={showControls}
      onClick={onClick}
    >
      <ButtonsContainer>
        {!isPlaying && (
          <BigButton isPrimary size={"large"}>
            <PlayIcon color="red" />
          </BigButton>
        )}
      </ButtonsContainer>
    </FloatingContainer>
  );
};
