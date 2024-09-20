import { Node } from "@tiptap/core";

export const Annotation = Node.create({
  name: "Annotation",
  content: "inline*",
  inline: true,
  parseHTML() {
    return [
      {
        tag: "span",
      },
    ];
  },
  renderHTML({ node }) {
    return [
      "observation",
      {
        style: "background-color: #ff000033;",
      },
      0,
    ];
  },
});
