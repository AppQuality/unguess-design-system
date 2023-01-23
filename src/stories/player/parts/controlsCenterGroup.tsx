import { ReactComponent as PlayIcon } from "../../../assets/icons/play-fill.svg";
import { ReactComponent as PauseIcon } from "../../../assets/icons/pause-fill.svg";
import { ReactComponent as ForwardIcon } from "../../../assets/icons/clock-out-fill.svg";
import { ReactComponent as RewindIcon } from "../../../assets/icons/clock-in-fill.svg";
import { ReactComponent as LoopIcon } from "../../../assets/icons/arrow-retweet-fill.svg";
import styled from "styled-components";
import { IconButton } from "../../buttons/icon-button";
import { MD, SM } from "../../typography/typescale";
import { getNextPlaybackRate } from "./utils";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const ControlsGroupCenter = ({
  handleClick,
  playBackRate,
  onRewind,
  onForward,
  handlePlayBackRateChange,
  isPlaying,
}: {
  handleClick: (e: any) => void;
  playBackRate: number;
  onRewind?: () => void;
  onForward?: () => void;
  handlePlayBackRateChange?: (rate: number) => void;
  isPlaying?: boolean;
}) => {
  return (
    <StyledDiv>
      <IconButton
        isBright
        onClick={(e) => {
          onRewind?.();
          e.stopPropagation();
        }}
      >
        <RewindIcon />
      </IconButton>
      <IconButton isBright size={"large"} onClick={(e) => handleClick(e)}>
        {isPlaying ? (
          <PauseIcon style={{ width: "24px", height: "24px" }} />
        ) : (
          <PlayIcon style={{ width: "24px", height: "24px" }} />
        )}
      </IconButton>
      <IconButton
        isBright
        onClick={(e) => {
          onForward?.();
          e.stopPropagation();
        }}
      >
        <ForwardIcon />
      </IconButton>
    </StyledDiv>
  );
};
