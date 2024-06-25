import { useVideoContext } from "@appquality/stream-player";
import { css, styled } from "styled-components";
import { Tooltip } from "../../tooltip";
import { IBookmark } from "../_types";
import { useProgressContext } from "../context/progressContext";
import { ReactComponent as GripIcon } from "../../../assets/icons/grip.svg";
import { getColor } from "../../theme/utils";

const StyledGrabber = styled.div<{ isEnd?: boolean }>`
  position: absolute;
  display: none;
  ${({ isEnd }) =>
    isEnd
      ? `
    right: 0;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  `
      : `
    left: 0;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  `}
  height: 100%;
  width: 8px;
  background-color: white;
  z-index: 2;
  cursor: ew-resize;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    color: ${({ theme }) => theme.palette.grey[500]};
    svg {
      width: auto;
      height: 50%;
    }
  }
`;

const activeBookMark = css`
  height: 250%;
  transform: translateY(-30%);
  cursor: pointer;
  z-index: 2;
  border-radius: 4px;

  ${StyledGrabber} {
    display: block;
  }
`;

const Rect = styled.div<{ hue?: string; isActive?: boolean; isFocused?:boolean; }>`
  position: absolute;
  height: 110%;
  background-color: ${({ hue, theme }) => getColor(hue || theme.palette.grey[800], undefined, undefined, 0.8)};
  z-index: 1;
  border-radius: 2px;
  color: white;
  transition: width 0.1s ease;

  &:hover {
    background-color: ${({ hue, theme }) => hue || theme.palette.grey[800]};
    ${activeBookMark}
  }

  ${({ isActive }) => isActive && activeBookMark}
  ${({ isFocused }) => isFocused && activeBookMark}
`;
const StyledTooltip = styled(Tooltip)<{ tooltipColor: string }>`
  margin-bottom: ${({ theme }) => theme.space.sm};
  color: ${({ tooltipColor }) => tooltipColor};

`;

const Grabber = (props: {
  observation: IBookmark;
  isEnd?: boolean;
  handleMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void;
}) => {
  const { observation } = props;
  const { setIsGrabbing, setactiveBookmark, setFromEnd } = useProgressContext();

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsGrabbing(true);
    setactiveBookmark(observation);
    setFromEnd(!!props.isEnd);
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <StyledGrabber
      isEnd={props.isEnd}
      onMouseDown={handleDragStart}
      onMouseMove={props.handleMouseMove}
    >
      <div>
        <GripIcon />
      </div>
    </StyledGrabber>
  );
};

export const Bookmark = (props: IBookmark) => {
  const { start, end, hue, tooltipContent } = props;

  const { context } = useVideoContext();
  const videoStart = context.part.start || 0;
  const videoEnd = context.part.end || context.player?.totalTime || 0;
  const duration = videoEnd - videoStart || context.player?.totalTime || 0; //relative
  const { activeBookmark } = useProgressContext();

  if (!context.player || !context.player.ref) {
    return null;
  }
  if (start > videoEnd || start < videoStart) return null;

  return (
    <StyledTooltip
      content={tooltipContent}
      type={"light"}
      size={"large"}
      isTransparent
    >
      <Rect
        isActive={activeBookmark && activeBookmark.id === props.id}
        hue={hue}
        isFocused={props.isFocused}
        style={{
          left: `${((start - videoStart) / duration) * 100}%`,
          width: `${((end - start) / duration) * 100}%`,
        }}
        onClick={props.onClick}
      >
        <Grabber observation={props} />
        <Grabber isEnd observation={props} />
      </Rect>
    </StyledTooltip>
  );
};
