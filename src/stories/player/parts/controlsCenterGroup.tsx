import { useVideoContext } from "@appquality/stream-player";
import { HTMLAttributes, useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as RewindIcon } from "../../../assets/icons/back-seconds-fill.svg";
import { ReactComponent as ForwardIcon } from "../../../assets/icons/forward-seconds-fill.svg";
import { ReactComponent as PauseIcon } from "../../../assets/icons/pause-fill.svg";
import { ReactComponent as PlayIcon } from "../../../assets/icons/play-fill.svg";
import { ReactComponent as PreviousIcon } from "../../../assets/icons/previous-fill.svg";
import { SM } from "../../typography/typescale";
import { ControlButton } from "./controlButton";
import { getNextPlaybackRate } from "./utils";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ControlsGroupCenter = (props: HTMLAttributes<HTMLDivElement>) => {
  const [playBackRate, setPlayBackRate] = useState<number>(1);
  const { context, togglePlay } = useVideoContext();

  const videoRef = context.player?.ref.current;
  const isPlaying = context.isPlaying;

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

  return (
    <StyledDiv {...props}>
      <ControlButton
        onClick={(e) => {
          if (videoRef) {
            videoRef.currentTime = 0;
          }
          e.stopPropagation();
        }}
      >
        <PreviousIcon />
      </ControlButton>
      <ControlButton
        onClick={(e) => {
          onRewind();
          e.stopPropagation();
        }}
      >
        <RewindIcon />
      </ControlButton>
      <ControlButton size={"large"} onClick={togglePlay}>
        {isPlaying ? (
          <PauseIcon style={{ width: "24px", height: "24px" }} />
        ) : (
          <PlayIcon style={{ width: "24px", height: "24px" }} />
        )}
      </ControlButton>
      <ControlButton
        onClick={(e) => {
          onForward();
          e.stopPropagation();
        }}
      >
        <ForwardIcon />
      </ControlButton>
      <ControlButton
        isPill
        onClick={(e) => {
          const newSpeed = getNextPlaybackRate(playBackRate);
          if (videoRef?.playbackRate) {
            setPlayBackRate(newSpeed);
            videoRef.playbackRate = newSpeed;
          }
          e.stopPropagation();
        }}
      >
        <SM isBold style={{ lineHeight: "16px" }}>
          {playBackRate}x
        </SM>
      </ControlButton>
    </StyledDiv>
  );
};
