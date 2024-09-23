import { Node } from "@tiptap/core";

export const Observation = Node.create({
  name: "Observation",
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
