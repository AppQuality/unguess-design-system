import { Node } from "@tiptap/pm/model";
import { Editor, NodeViewContent, NodeViewWrapper } from "@tiptap/react";

export const Component = ({ node, editor }: { node: Node; editor: Editor }) => {
  return (
    <NodeViewWrapper {...node.attrs} as="span" className="react-component">
      <span
        onClick={() => {
          editor.commands.setCurrentTime(node.attrs["data-start"]);
        }}
      >
        <NodeViewContent as="span" className="content is-editable" />
      </span>
    </NodeViewWrapper>
  );
};
