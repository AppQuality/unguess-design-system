import { Node } from "@tiptap/pm/model";
import { Editor, NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { getTheme } from "../../extensions/theme";

export const Component = ({ node, editor }: { node: Node; editor: Editor }) => {
  const themeExtension = getTheme(editor);

  const WordWrapper = themeExtension.options.wordWrapper;
  return (
    <NodeViewWrapper {...node.attrs} as="div" style={{ display: "inline" }}>
      <WordWrapper>
        <span
          onClick={() => {
            editor.commands.setCurrentTime(node.attrs["data-start"]);
          }}
        >
          <NodeViewContent as="span" className="content is-editable" />
        </span>
      </WordWrapper>
    </NodeViewWrapper>
  );
};
