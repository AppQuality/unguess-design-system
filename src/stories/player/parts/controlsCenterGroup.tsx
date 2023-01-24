import { ReactComponent as PlayIcon } from "../../../assets/icons/play-fill.svg";
import { ReactComponent as PauseIcon } from "../../../assets/icons/pause-fill.svg";
import { ReactComponent as ForwardIcon } from "../../../assets/icons/clock-out-fill.svg";
import { ReactComponent as RewindIcon } from "../../../assets/icons/clock-in-fill.svg";
import { ReactComponent as PreviousIcon } from "../../../assets/icons/previous-fill.svg";
import styled from "styled-components";
import { IconButton } from "../../buttons/icon-button";
import { MD } from "../../typography/typescale";
import { getNextPlaybackRate } from "./utils";
import { useCallback, useEffect, useState } from "react";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const ControlsGroupCenter = ({
  videoRef,
  isPlaying,
  onPlayChange,
}: {
  videoRef: HTMLVideoElement | null;
  isPlaying?: boolean;
  onPlayChange?: (isPlaying: boolean) => void;
}) => {
  const [playBackRate, setPlayBackRate] = useState<number>(1);

  useEffect(() => {
    if (videoRef) {
      setPlayBackRate(videoRef.playbackRate);
    }
  }, [videoRef]);

  const onRewind = () => {
    if (!videoRef) return;
    const nextTime = Math.max(0.01, videoRef.currentTime - 10);

    videoRef.currentTime = nextTime;
  };
  const onForward = () => {
    if (!videoRef) return;
    const nextTime = videoRef.currentTime + 10;

    videoRef.currentTime = nextTime;
  };

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
    <StyledDiv>
      <IconButton
        isBright
        onClick={(e) => {
          if (videoRef) {
            videoRef.currentTime = 0;
          }
          e.stopPropagation();
        }}
      >
        <PreviousIcon />
      </IconButton>
      <IconButton
        isBright
        onClick={(e) => {
          onRewind();
          e.stopPropagation();
        }}
      >
        <RewindIcon />
      </IconButton>
      <IconButton isBright size={"large"} onClick={handlePlay}>
        {isPlaying ? (
          <PauseIcon style={{ width: "24px", height: "24px" }} />
        ) : (
          <PlayIcon style={{ width: "24px", height: "24px" }} />
        )}
      </IconButton>
      <IconButton
        isBright
        onClick={(e) => {
          onForward();
          e.stopPropagation();
        }}
      >
        <ForwardIcon />
      </IconButton>
      <IconButton
        isBright
        onClick={(e) => {
          const newSpeed = getNextPlaybackRate(playBackRate);
          if (videoRef?.playbackRate) {
            setPlayBackRate(newSpeed);
            videoRef.playbackRate = newSpeed;
          }
          e.stopPropagation();
        }}
      >
        <MD isBold>{playBackRate}x</MD>
      </IconButton>
    </StyledDiv>
  );
};
