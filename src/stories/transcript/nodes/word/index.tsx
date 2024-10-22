import { Node } from "@tiptap/core";
import { Plugin } from "@tiptap/pm/state";

export const Word = Node.create({
  name: "Word",
  group: "inline",
  content: "inline*",
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
        tag: "word[data-start][data-end]",
      },
    ];
  },
  renderHTML({ node }) {
    return [
      "word",
      {
        "data-start": node.attrs["data-start"],
        "data-end": node.attrs["data-end"],
        style: "",
      },
      0,
    ];
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            click: (view, event) => {
              const { target } = event;
              if (
                target instanceof HTMLElement &&
                target.getAttribute("data-start")
              ) {
                const dataStart = target.getAttribute("data-start");

                if (!dataStart) return false;

                this.editor.commands.setCurrentTime(Number(dataStart));
                return true;
              }
              return false;
            },
          },
        },
      }),
    ];
  },
});
