import { Node } from "@tiptap/core";

export const Word = Node.create({
  name: "Word",
  content: "text*",
  group: "inline",
  inline: true,
  addAttributes() {
    return {
      "data-start": {
        default: null,
      },
      "data-end": {
        default: null,
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: "span[data-start][data-end]",
      },
    ];
  },
  renderHTML({ node }) {
    return [
      "span",
      {
        "data-start": node.attrs["data-start"],
        "data-end": node.attrs["data-end"],
        style: "",
      },
      0,
    ];
  },
});
