import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Progress } from "../../loaders/progress";
import { PlayerTooltip } from "./tooltip";
import { WrapperProps } from "../_types";
import { ControlsGroupCenter } from "./controlsCenterGroup";
import { TimeLabel } from "./timeLabel";
import { AudioButton } from "./audioButton";
import { formatDuration } from "./utils";
import { FullScreenButton } from "./fullScreenButton";

export const ControlsWrapper = styled.div<WrapperProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.space.xxs} 0;
  background-color: ${({ theme }) => theme.palette.grey[700]};
  ${({ isPlaying }) => isPlaying && "display: none;"}
  z-index: 2;
`;

const StyledProgress = styled(Progress)`
  width: 100%;
  border-radius: 0;
  color: ${({ theme }) => theme.palette.kale[400]};
  cursor: pointer;
  > div {
    border-radius: 0;
  }
`;

const StyledTooltip = styled(PlayerTooltip)`
  display: none;
`;

const ProgressContainer = styled.div`
  position: relative;
  &:hover ${StyledTooltip} {
    display: flex;
  }
`;

export const ControlsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

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
    const totalTime = videoRef?.duration || duration || 0;
    if (progressRef && progressRef.current && totalTime) {
      const bounds = progressRef.current.getBoundingClientRect();
      const x = clientX - bounds.left;
      const videoPositionSecs =
        (x / progressRef.current.clientWidth) * totalTime;
      return videoPositionSecs;
    }

    return 0;
  };

  const handleProgressUpdate = useCallback(() => {
    const totalTime = videoRef?.duration || duration || 0;
    const currentTime = videoRef?.currentTime || 0;
    setProgress((currentTime / totalTime) * 100);
  }, [duration, videoRef]);

  const handleSkipAhead = useCallback(
    (pageX: number) => {
      if (videoRef) {
        videoRef.currentTime = getVideoPositionFromEvent(pageX);
      }
    },
    [videoRef]
  );


  const StyledDiv = styled.div`
    display: flex;
    align-items: center;
  `;

  const onMouseEvent = (e: MouseEvent<HTMLDivElement>) => {
    if (progressRef && progressRef.current) {
      const tooltipWidth = 40;
      const maxMargin = progressRef.current.clientWidth - tooltipWidth;

      const bounds = progressRef.current.getBoundingClientRect();
      const marginX = e.clientX - bounds.left;
      const newTooltipMargin = marginX >= maxMargin ? maxMargin : marginX;
      const videoTargetDuration = getVideoPositionFromEvent(e.clientX);

      setTooltipMargin(newTooltipMargin);
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

  return (
    <ControlsWrapper isPlaying={isPlaying}>
      <ProgressContainer
        onMouseEnter={onMouseEvent}
        onMouseMove={onMouseEvent}
        onMouseLeave={onMouseEvent}
      >
        <StyledTooltip style={{ marginLeft: `${tooltipMargin}px` }}>
          {tooltipLabel}
        </StyledTooltip>
        <TimeLabel
          current={formatDuration(videoRef?.currentTime || 0)}
          duration={formatDuration(duration)}
        />
        <StyledProgress
          ref={progressRef}
          value={progress}
          onClick={(e) => handleSkipAhead(e.clientX)}
        />
      </ProgressContainer>
      <ControlsBar>
        <StyledDiv>
          <AudioButton videoRef={videoRef} />
        </StyledDiv>
        <ControlsGroupCenter
          videoRef={videoRef}
          onPlayChange={onPlayChange}
          isPlaying={isPlaying}
        />
        <StyledDiv>
          <FullScreenButton videoRef={videoRef} />
        </StyledDiv>
      </ControlsBar>
    </ControlsWrapper>
  );
};
