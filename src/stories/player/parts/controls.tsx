import { useVideoContext } from "@appquality/stream-player";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useDebounce from "../../../hooks/useDebounce";
import { IBookmark, PlayerI18n, WrapperProps } from "../_types";
import { useProgressContext } from "../context/progressContext";
import { formatDuration } from "../utils";
import { AudioButton } from "./audioButton";
import { Bookmark } from "./bookmark";
import { ControlsGroupCenter } from "./controlsCenterGroup";
import { CutStart } from "./CutStart";
import { Cutter } from "./cutterButton";
import { FullScreenButton } from "./fullScreenButton";
import { ProgressBar } from "./progress";
import { TimeLabel } from "./timeLabel";
import { PlayerTooltip } from "./tooltip";

export const ControlsWrapper = styled.div<WrapperProps>`
  ${({ showControls }) =>
    showControls ? "position: relative;" : "position: absolute;"}
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.space.xxs} 0;
  background-color: ${({ theme }) => theme.palette.grey[100]};
  height: 80px;
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
  gap: ${({ theme }) => theme.space.xxs};
`;

const CurrentTimeMarker = styled.div<{
  left: number;
}>`
  width: 2px;
  top: 0;
  left: ${({ left }) => `${left}%`};
  position: absolute;
  height: 110%;
  z-index: 1;
  background-color: white;
`;

export const Controls = ({
  container,
  onCutHandler,
  bookmarks,
  isCutting,
  onBookMarkUpdated,
  i18n,
  showControls = false,
}: {
  container: HTMLDivElement | null;
  onCutHandler?: (time: number) => void;
  bookmarks?: IBookmark[];
  isCutting?: boolean;
  onBookMarkUpdated?: (bookmark: IBookmark) => void;
  i18n?: PlayerI18n;
  showControls?: boolean;
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [tooltipMargin, setTooltipMargin] = useState<number>(0);
  const [tooltipLabel, setTooltipLabel] = useState<string>("00:00");
  const [marks, setMarks] = useState<IBookmark[] | undefined>(bookmarks);
  const [updatedMark, setUpdatedMark] = useState<IBookmark>();
  const progressRef = useRef<HTMLDivElement>(null);
  const { context, setCurrentTime } = useVideoContext();
  const debouncedMark = useDebounce(updatedMark, 500);
  const [cutStart, setCutStart] = useState<number>(0);

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
    [progressRef, duration],
  );

  const getProgress = useCallback(
    (currentTime: number) => {
      const current = currentTime - (context.part.start || 0);

      if (duration === 0) return 0;

      return (current / duration) * 100;
    },
    [context.part.start, duration],
  );

  const handleSkipAhead = useCallback(
    (pageX: number) => {
      const time = getVideoPositionFromEvent(pageX) + (context.part.start || 0);
      setCurrentTime(time);
      setProgress(getProgress(time));
    },
    [
      getVideoPositionFromEvent,
      context.part.start,
      setCurrentTime,
      getProgress,
    ],
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
        (mark) => mark.id === activeBookmark.id,
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
      setUpdatedMark(updatedMark);
    },
    [activeBookmark, context.part.start, duration, fromEnd, marks],
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

  useEffect(() => {
    if (debouncedMark) {
      onBookMarkUpdated?.(debouncedMark);
    }
  }, [debouncedMark, onBookMarkUpdated]);

  useEffect(() => {
    if (isCutting) {
      setCutStart(progress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCutting]);

  return (
    <ControlsWrapper
      showControls={showControls}
      {...(!showControls && { isPlaying: context.isPlaying })}
    >
      <ProgressContainer
        onMouseEnter={onMouseEvent}
        onMouseMove={onMouseEvent}
        onMouseLeave={onMouseEvent}
      >
        <StyledTooltip style={{ marginLeft: `${tooltipMargin}px` }}>
          {tooltipLabel}
        </StyledTooltip>
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
        {isCutting && <CutStart left={cutStart} />}
        <CurrentTimeMarker left={progress} />
      </ProgressContainer>

      <ControlsBar>
        <StyledDiv style={{ width: "20%", justifyContent: "start" }}>
          <AudioButton i18n={i18n} />
          <TimeLabel current={relCurrentTime} duration={duration} />
        </StyledDiv>
        <ControlsGroupCenter style={{ width: "60%" }} i18n={i18n} />

        <StyledDiv style={{ width: "20%", justifyContent: "end" }}>
          <Cutter
            onCutHandler={onCutHandler}
            isCutting={isCutting}
            i18n={i18n}
          />
          <FullScreenButton container={container} />
        </StyledDiv>
      </ControlsBar>
    </ControlsWrapper>
  );
};
