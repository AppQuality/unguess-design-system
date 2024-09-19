import { Node } from "@tiptap/core";

export const Active = Node.create({
  name: "Active",
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
      "span",
      {
        style: "background-color: #ff0000;",
      },
      0,
    ];
  },
});
