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

const findActiveWord = (node: PMNode): PMNode | null => {
  let activeWord: PMNode | null = null;

  node.descendants((child) => {
    if (activeWord !== null) return false;
    if (child.type.name === "Word") {
      child.descendants((grandchild) => {
        if (activeWord !== null) return false;
        if (grandchild.type.name === "Active") {
          activeWord = child;
        }
      });
    }
  });

  return activeWord;
};

const Content = ({ node, editor }: { node: PMNode; editor: Editor }) => {
  return (
    <>
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
    </>
  );
};

export const Component = ({
  node,
  editor,
}: {
  node: PMNode;
  editor: Editor;
}) => {
  if (!node.attrs.sentences || node.attrs.sentences.length === 0) {
    return (
      <NodeViewWrapper className="react-component">
        <Content node={node} editor={editor} />
      </NodeViewWrapper>
    );
  }
  const activeWord = findActiveWord(node);
  return (
    <NodeViewWrapper className="react-component">
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <Content node={node} editor={editor} />
        </div>
        <div style={{ width: "50%" }}>
          {node.attrs.sentences.map(
            (
              sentence: { text: string; start: number; end: number },
              index: number
            ) => (
              <p
                style={{
                  backgroundColor: activeWord
                    ? activeWord.attrs["data-start"] >= sentence.start &&
                      activeWord.attrs["data-end"] <= sentence.end
                      ? "yellow"
                      : "transparent"
                    : "transparent",
                }}
                key={index}
              >
                {sentence.text}
              </p>
            )
          )}
        </div>
      </div>
    </NodeViewWrapper>
  );
};
