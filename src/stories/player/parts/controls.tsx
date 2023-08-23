import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Video, { useVideoContext } from "@appquality/stream-player";
import { Progress } from "../../loaders/progress";
import { PlayerTooltip } from "./tooltip";
import { WrapperProps } from "../_types";
import { ControlsGroupCenter } from "./controlsCenterGroup";
import { TimeLabel } from "./timeLabel";
import { AudioButton } from "./audioButton";
import { formatDuration } from "./utils";
import { FullScreenButton } from "./fullScreenButton";
import { getColor } from "@zendeskgarden/react-theming";

export const ControlsWrapper = styled.div<WrapperProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.space.xxs} 0;
  background-color: ${({ theme }) =>
    getColor(theme.palette.grey, 700, undefined, 0.8)};
  ${({ isPlaying }) => isPlaying && "display: none;"}
  z-index: 2;
`;

const StyledProgress = styled(Progress)`
  width: 100%;
  border-radius: 0;
  color: ${({ theme }) => theme.palette.kale[700]};
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

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const Controls = ({
  container,
}: {
  container: HTMLDivElement | null;
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [tooltipMargin, setTooltipMargin] = useState<number>(0);
  const [tooltipLabel, setTooltipLabel] = useState<string>("00:00");
  const progressRef = useRef<HTMLDivElement>(null);
  const { context, setCurrentTime } = useVideoContext();

  const relCurrentTime =
    (context.player?.currentTime || 0) - context.part.start;
  const duration =
    context.part.end - context.part.start || context.player?.totalTime || 0; //relative

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

  const handleSkipAhead = useCallback(
    (pageX: number) => {
      const time = getVideoPositionFromEvent(pageX) + (context.part.start || 0);
      setCurrentTime(time);
      setProgress(getProgress(time));
    },
    [context.player, context.part]
  );

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
    const currentTime = context.player?.currentTime || 0;
    setProgress(getProgress(currentTime));
  }, [context.player]);

  const getProgress = useCallback(
    (currentTime: number) => {
      const current = currentTime - (context.part.start || 0);

      if (duration === 0) return 0;

      return (current / duration) * 100;
    },
    [context.player]
  );

  return (
    <ControlsWrapper isPlaying={context.isPlaying}>
      <ProgressContainer
        onMouseEnter={onMouseEvent}
        onMouseMove={onMouseEvent}
        onMouseLeave={onMouseEvent}
      >
        <StyledTooltip style={{ marginLeft: `${tooltipMargin}px` }}>
          {tooltipLabel}
        </StyledTooltip>
        <TimeLabel
          current={formatDuration(relCurrentTime)}
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
          <AudioButton />
        </StyledDiv>
        <ControlsGroupCenter />

        <StyledDiv>
          <FullScreenButton container={container} />
        </StyledDiv>
      </ControlsBar>
    </ControlsWrapper>
  );
};
