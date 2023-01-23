import { useCallback, useState } from "react";
import { IconButton } from "../../buttons/icon-button";
import { ReactComponent as PlayIcon } from "../../../assets/icons/play-fill.svg";
import styled from "styled-components";

interface WrapperProps {
  isPlaying?: boolean;
}

export const ControlsWrapper = styled.div<WrapperProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: ${({ theme }) => theme.space.xxs};
  background-color: ${({ theme }) => theme.palette.grey[700]};
  display: flex;
  justify-content: space-between;

  ${({ isPlaying }) => isPlaying && "display: none;"}
`;

const LeftControls = styled.div``;
const CenterControls = styled.div``;
const RightControls = styled.div``;

export const Controls = (props: {
  videoRef: HTMLVideoElement | null;
  isPlaying?: boolean;
  onPlayChange?: (isPlaying: boolean) => void;
}) => {
  const { videoRef, onPlayChange, isPlaying } = props;

  const handlePlay = useCallback(() => {
    if (!videoRef) return;
    if (videoRef.paused) {
      videoRef.play();
      onPlayChange?.(true);
    } else {
      videoRef.pause();
      onPlayChange?.(false);
    }
  }, [videoRef]);

  return (
    <ControlsWrapper isPlaying={isPlaying}>
      <LeftControls>
        <IconButton isNeutral onClick={handlePlay}>
          <PlayIcon />
        </IconButton>
      </LeftControls>
      <CenterControls>
        <IconButton isNeutral onClick={handlePlay}>
          <PlayIcon />
        </IconButton>
      </CenterControls>
      <RightControls>
        <IconButton isNeutral onClick={handlePlay}>
          <PlayIcon />
        </IconButton>
      </RightControls>
    </ControlsWrapper>
  );
};
