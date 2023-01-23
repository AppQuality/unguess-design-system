import { ReactComponent as PlayIcon } from "../../../assets/icons/play-fill.svg";
import { ReactComponent as PauseIcon } from "../../../assets/icons/pause-fill.svg";
import styled from "styled-components";
import { IconButton } from "../../buttons/icon-button";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const ControlsGroupCenter = ({
  handleClick,
  isPlaying,
}: {
  handleClick: (e: any) => void;
  isPlaying?: boolean;
}) => {
  return (
    <StyledDiv>
      <IconButton isBright size={"small"} onClick={(e) => handleClick(e)}>
        <PlayIcon />
      </IconButton>
      <IconButton isBright size={"small"} onClick={(e) => handleClick(e)}>
        <PlayIcon />
      </IconButton>
      <IconButton isBright size={"large"} onClick={(e) => handleClick(e)}>
        {isPlaying ? (
          <PauseIcon style={{ width: "24px", height: "24px" }} />
        ) : (
          <PlayIcon style={{ width: "24px", height: "24px" }} />
        )}
      </IconButton>
      <IconButton isBright size={"small"} onClick={(e) => handleClick(e)}>
        <PlayIcon />
      </IconButton>
      <IconButton isBright size={"small"} onClick={(e) => handleClick(e)}>
        <PlayIcon />
      </IconButton>
    </StyledDiv>
  );
};
