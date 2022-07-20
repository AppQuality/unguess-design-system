import { mergeAttributes, Node } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { LG, XL } from "../../typography/typescale";
import { XLArgs } from "../../typography/typescale/_types";

const TipTappedH1 = (props: XLArgs) => (
  <NodeViewWrapper className="react-component">
    <XL {...props} />
  </NodeViewWrapper>
);

export default Node.create({
  name: "reactComponent",

  group: "block",

  atom: true,

  parseHTML() {
    return [
      {
        tag: "title",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["title", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TipTappedH1);
  },
});
