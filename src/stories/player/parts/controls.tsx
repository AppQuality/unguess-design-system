import { useVideoContext } from "@appquality/stream-player";
import { getColor } from "@zendeskgarden/react-theming";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IBookmark, WrapperProps } from "../_types";
import { AudioButton } from "./audioButton";
import { Bookmark } from "./bookmark";
import { ControlsGroupCenter } from "./controlsCenterGroup";
import { FullScreenButton } from "./fullScreenButton";
import { ProgressBar } from "./progress";
import { useProgressContext } from "./progressContext";
import { TimeLabel } from "./timeLabel";
import { PlayerTooltip } from "./tooltip";
import { formatDuration } from "./utils";

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
  onCutHandler,
  bookmarks,
  isCutting,
  onBookMarkUpdated,
}: {
  container: HTMLDivElement | null;
  onCutHandler?: (time: number) => void;
  bookmarks?: IBookmark[];
  isCutting?: boolean;
  onBookMarkUpdated?: (bookmark: IBookmark) => void;
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [tooltipMargin, setTooltipMargin] = useState<number>(0);
  const [tooltipLabel, setTooltipLabel] = useState<string>("00:00");
  const [marks, setMarks] = useState<IBookmark[] | undefined>(bookmarks);
  const progressRef = useRef<HTMLDivElement>(null);
  const { context, setCurrentTime } = useVideoContext();

  const { reset, isGrabbing, activeBookmark, fromEnd } = useProgressContext();

  useEffect(() => {
    setMarks(bookmarks);
  }, [bookmarks]);

  const relCurrentTime = context.player?.currentTime
    ? context.player?.currentTime - context.part.start
    : 0;
  const duration =
    context.part.end - context.part.start || context.player?.totalTime || 0; //relative

  const getVideoPositionFromEvent = useCallback(
    (clientX: number) => {
      if (progressRef && progressRef.current && duration) {
        const bounds = progressRef.current.getBoundingClientRect();
        const x = clientX - bounds.left;
        const videoPositionSecs =
          (x / progressRef.current.clientWidth) * duration;
        return videoPositionSecs;
      }

      return 0;
    },
    [progressRef, duration]
  );

  const getProgress = useCallback(
    (currentTime: number) => {
      const current = currentTime - (context.part.start || 0);

      if (duration === 0) return 0;

      return (current / duration) * 100;
    },
    [context.part.start, duration]
  );

  const handleSkipAhead = useCallback(
    (pageX: number) => {
      const time = getVideoPositionFromEvent(pageX) + (context.part.start || 0);
      setCurrentTime(time);
      setProgress(getProgress(time));
    },
    [getVideoPositionFromEvent, context.part.start, setCurrentTime, getProgress]
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

      if (isGrabbing) {
        handleBookmarkUpdate(marginX, progressRef.current.clientWidth);
      }
    }
  };

  const handleBookmarkUpdate = useCallback(
    (newX: number, clientW: number) => {
      if (!activeBookmark || !marks) return;

      const currentObsIndex = marks.findIndex(
        (mark) => mark.id === activeBookmark.id
      );
      const value = (newX / clientW) * duration + context.part.start;

      const updatedMark = {
        ...marks[currentObsIndex],
        ...(!!fromEnd ? { end: value } : { start: value }),
      };

      const newMarks = [
        ...marks.slice(0, currentObsIndex),
        updatedMark,
        ...marks.slice(currentObsIndex + 1),
      ];
      setMarks(newMarks);
      onBookMarkUpdated?.(updatedMark);
    },
    [
      activeBookmark,
      context.part.start,
      duration,
      fromEnd,
      onBookMarkUpdated,
      marks,
    ]
  );

  useEffect(() => {
    const currentTime = context.player?.currentTime || 0;
    setProgress(getProgress(currentTime));
  }, [context.player, getProgress]);

  useEffect(() => {
    if (!marks) return;
    document.addEventListener("mouseup", reset);

    return () => {
      document.removeEventListener("mouseup", reset);
    };
  }, [reset, marks]);

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
        {!!duration &&
          marks?.map((bookmark, index) => (
            <Bookmark key={`${index}${bookmark.start}`} {...bookmark} />
          ))}
        <ProgressBar
          ref={progressRef}
          progress={progress}
          handleSkipAhead={handleSkipAhead}
          duration={duration}
        />
      </ProgressContainer>

      <ControlsBar>
        <StyledDiv>
          <AudioButton />
        </StyledDiv>
        <ControlsGroupCenter
          onCutHandler={onCutHandler}
          isCutting={isCutting}
        />

        <StyledDiv>
          <FullScreenButton container={container} />
        </StyledDiv>
      </ControlsBar>
    </ControlsWrapper>
  );
};
