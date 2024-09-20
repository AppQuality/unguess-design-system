import { Editor, NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { Node as PMNode } from "prosemirror-model";
import styled from "styled-components";

const Label = styled.p`
  user-select: none;
  margin: 24px 0 12px;
`;

const formatTime = (seconds: number) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  if (seconds < 3600) return date.toISOString().substring(14, 19);
  return date.toISOString().substring(11, 19);
};

export const Component = ({
  node,
  editor,
}: {
  node: PMNode;
  editor: Editor;
}) => {
  return (
    <NodeViewWrapper className="react-component">
      <Label
        onClick={() => {
          let currentWord: PMNode | null = null;
          node.descendants((child) => {
            if (currentWord !== null) return false;
            if (child.type.name === "Word") {
              currentWord = child;
            }
          });
          if (!currentWord) return;
          const word = currentWord as PMNode;
          editor.commands.setCurrentTime(word.attrs["data-start"]);
        }}
        contentEditable={false}
      >
        {node.attrs.speakername} ({formatTime(node.attrs.start)} -{" "}
        {formatTime(node.attrs.end)})
      </Label>
      <NodeViewContent className="content is-editable" />
    </NodeViewWrapper>
  );
};
