import {
  Draggable as ZDDraggable,
  DraggableList as ZDraggableList,
} from "@zendeskgarden/react-drag-drop";
import styled from "styled-components";

const StyledDraggable = styled(ZDDraggable)`
  cursor: pointer;
`;

export { ZDraggableList as DraggableList };
export { StyledDraggable as Draggable };
