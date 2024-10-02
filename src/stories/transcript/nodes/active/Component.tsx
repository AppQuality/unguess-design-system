import { Editor, NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { Node as PMNode } from "prosemirror-model";
import { getTheme } from "../../extensions/theme";

export const Component = ({
  node,
  editor,
}: {
  node: PMNode;
  editor: Editor;
}) => {
  const themeExtension = getTheme(editor);
  const ActiveWrapper = themeExtension.options.activeWrapper;
  return (
    <NodeViewWrapper as="div" style={{ display: "inline" }}>
      <ActiveWrapper>
        <NodeViewContent as="span" className="content is-editable" />
      </ActiveWrapper>
    </NodeViewWrapper>
  );
};
