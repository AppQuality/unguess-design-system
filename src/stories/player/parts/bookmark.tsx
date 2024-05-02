import { styled } from "styled-components";
import { IBookmark } from "../_types";
import { Tooltip } from "../../tooltip";
import { useVideoContext } from "@appquality/stream-player";

const Rect = styled.div<{ hue?: string }>`
  position: absolute;
  width: 5px;
  height: 100%;
  background-color: ${({ hue, theme }) => hue || theme.palette.grey[800]};
  transform: translateX(-50%);
  z-index: 1;
`;

export const Bookmark = ({ start, hue, label, ...props }: IBookmark) => {
  const { context } = useVideoContext();
  const videoStart = context.part.start || 0;
  const videoEnd = context.part.end || context.player?.totalTime || 0;
  const duration = videoEnd - videoStart || context.player?.totalTime || 0; //relative

  if (!context.player || !context.player.ref) {
    return null;
  }

  if (start > videoEnd || start < videoStart) return null;

  return (
    <Tooltip content={label} type={"light"} size={"large"}>
      <Rect
        hue={hue}
        style={{ left: `${((start - videoStart) / duration) * 100}%` }}
      />
    </Tooltip>
  );
};
