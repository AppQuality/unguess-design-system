import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { Node as PMNode } from "prosemirror-model";
import styled from "styled-components";
import { LG } from "../../../typography/typescale";

const Label = styled(LG)`
  user-select: none;
`;

const formatTime = (seconds: number) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  if (seconds < 3600) return date.toISOString().substring(14, 19);
  return date.toISOString().substring(11, 19);
};

export const Component = ({ node }: { node: PMNode }) => {
  return (
    <NodeViewWrapper className="react-component">
      <Label onClick={() => alert(1)} contentEditable={false}>
        {node.attrs.speakername} ({formatTime(node.attrs.start)} -{" "}
        {formatTime(node.attrs.end)})
      </Label>
      <NodeViewContent className="content is-editable" />
    </NodeViewWrapper>
  );
};
