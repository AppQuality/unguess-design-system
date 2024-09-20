import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { Component } from "./Component";

export const Paragraph = Node.create({
  name: "Paragraph",
  group: "block",

  atom: true,
  content: "inline*",

  addAttributes() {
    return {
      speakername: {
        default: "Speaker",
      },
      start: {
        default: 0,
      },
      end: {
        default: 0,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "speaker-paragraph",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["speaker-paragraph", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});