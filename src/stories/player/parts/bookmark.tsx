import { styled } from "styled-components";
import { IBookmark } from "../_types";
import { Tooltip } from "../../tooltip";

const Rect = styled.div<{ hue?: string }>`
  position: absolute;
  width: 5px;
  height: 100%;
  background-color: ${({ hue, theme }) => hue || theme.palette.grey[800]};
  transform: translateX(-50%);
  z-index: 1;
`;

export const Bookmark = ({ start, hue, label, ...props }: IBookmark) => (
  <Tooltip content={label} type={"light"} size={"large"}>
    <Rect hue={hue} style={{ left: `${start}%` }} />
  </Tooltip>
);
