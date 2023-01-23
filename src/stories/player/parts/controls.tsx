import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { IconButton } from "../../buttons/icon-button";
import { ReactComponent as PlayIcon } from "../../../assets/icons/play-fill.svg";
import styled from "styled-components";
import { Progress } from "../../loaders/progress";
import { PlayerTooltip } from "./tooltip";
import { WrapperProps } from "./types";
import { ControlsGroupCenter } from "./controlsCenterGroup";

export const ControlsWrapper = styled.div<WrapperProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.space.xxs} 0;
  background-color: ${({ theme }) => theme.palette.grey[700]};
  ${({ isPlaying }) => isPlaying && "display: none;"}
`;

const StyledProgress = styled(Progress)`
  width: 100%;
  border-radius: 0;
  color: ${({ theme }) => theme.palette.red[700]};
  cursor: pointer;
  > div {
    border-radius: 0;
  }
`;

const StyledTooltip = styled(PlayerTooltip)`
  display: none;
`;

const ProgressContainer = styled.div`
  &:hover ${StyledTooltip} {
    display: flex;
  }
`;

export const ControlsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftControls = styled.div``;
const RightControls = styled.div``;

const formatDuration = (durationInSeconds: number) => {
  const min = Math.floor(durationInSeconds / 60);
  const sec = Math.floor(durationInSeconds - min * 60);

  const minutes = `${min}`.padStart(2, "0");
  const seconds = `${sec}`.padStart(2, "0");

  return `${minutes}:${seconds}`;
};

export const Controls = (props: {
  videoRef: HTMLVideoElement | null;
  duration: number;
  isPlaying?: boolean;
  onPlayChange?: (isPlaying: boolean) => void;
}) => {
  const { videoRef, onPlayChange, isPlaying, duration } = props;
  const [progress, setProgress] = useState<number>(0);
  const [tooltipMargin, setTooltipMargin] = useState<number>(0);
  const [tooltipLabel, setTooltipLabel] = useState<string>("00:00");
  const progressRef = useRef<HTMLDivElement>(null);

  const getVideoPositionFromEvent = (clientX: number) => {
    if (progressRef && progressRef.current && duration) {
      const bounds = progressRef.current.getBoundingClientRect();
      const x = clientX - bounds.left;
      const videoPositionSecs =
        (x / progressRef.current.clientWidth) * duration;
      return videoPositionSecs;
    }

    return 0;
  };

  const handleProgressUpdate = () => {
    const currentTime = videoRef?.currentTime || 0;
    console.log("Handle progress", currentTime, duration);
    setProgress((currentTime / duration) * 100);
  };

  const handleSkipAhead = (pageX: number) => {
    if (videoRef) {
      videoRef.currentTime = getVideoPositionFromEvent(pageX);
    }
  };

  const onMouseEvent = (e: MouseEvent<HTMLDivElement>) => {
    if (progressRef && progressRef.current) {
      const tooltipWidth = 40;
      const maxMargin = progressRef.current.clientWidth - tooltipWidth;

      const bounds = progressRef.current.getBoundingClientRect();
      const marginX = e.clientX - bounds.left;
      const tooltipMargin = marginX >= maxMargin ? maxMargin : marginX;
      const videoTargetDuration = getVideoPositionFromEvent(e.clientX);

      setTooltipMargin(tooltipMargin);
      setTooltipLabel(formatDuration(videoTargetDuration));
    }
  };

  useEffect(() => {
    if (videoRef) {
      videoRef.addEventListener("timeupdate", handleProgressUpdate);
    }

    return () => {
      if (videoRef) {
        videoRef.removeEventListener("timeupdate", handleProgressUpdate);
      }
    };
  }, [videoRef]);

  const handlePlay = useCallback(
    (e: any) => {
      console.log("Handle play", videoRef);
      if (!videoRef) return;
      if (videoRef.paused) {
        videoRef.play();
        onPlayChange?.(true);
      } else {
        videoRef.pause();
        onPlayChange?.(false);
      }
      e.stopPropagation();
    },
    [videoRef, isPlaying]
  );

  return (
    <ControlsWrapper isPlaying={isPlaying}>
      <ProgressContainer
        onMouseEnter={onMouseEvent}
        onMouseMove={onMouseEvent}
        onMouseLeave={onMouseEvent}
      >
        <StyledTooltip style={{ marginLeft: tooltipMargin + "px" }}>
          {tooltipLabel}
        </StyledTooltip>
        <StyledProgress
          ref={progressRef}
          value={progress}
          onClick={(e) => handleSkipAhead(e.clientX)}
        />
      </ProgressContainer>
      <ControlsBar>
        <LeftControls>
          <IconButton isBright onClick={(e) => handlePlay(e)}>
            <PlayIcon />
          </IconButton>
        </LeftControls>
        <ControlsGroupCenter
          handleClick={(e) => handlePlay(e)}
          isPlaying={isPlaying}
        />
        <RightControls>
          <IconButton isBright onClick={(e) => handlePlay(e)}>
            <PlayIcon />
          </IconButton>
        </RightControls>
      </ControlsBar>
    </ControlsWrapper>
  );
};
