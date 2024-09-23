import { Editor, NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { Node as PMNode } from "prosemirror-model";
import { Tooltip } from "../../../tooltip";

const useTypeSpec = (type: string) => {
  switch (type) {
    default:
      return {
        background: "rgba(144,144,144,0.3)",
      };
  }
};

export const Component = ({
  node,
  editor,
}: {
  node: PMNode;
  editor: Editor;
}) => {
  const { background } = useTypeSpec(node.attrs["type"]);
  return (
    <NodeViewWrapper as="span" className="react-component">
      <span style={{ background }}>
        <Tooltip content={node.attrs["title"] || ""}>
          <span>
            <NodeViewContent as="span" className="content is-editable" />
          </span>
        </Tooltip>
      </span>
    </NodeViewWrapper>
  );
};
