import { Highlight } from "./base";

export const Negative = Highlight.extend({
  name: "negativeMark",

  addStorage() {
    return { color: "#ff0000" };
  },

  addOptions() {
    return {
      id: "",
      HTMLAttributes: {},
    };
  },

  addCommands() {
    return {
      setNegativeHighlight:
        (attributes) =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes);
        },
      toggleNegativeHighlight:
        (attributes) =>
        ({ commands }) => {
          return commands.toggleMark(this.name, attributes);
        },
      unsetNegativeHighlight:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Shift-k": () => this.editor.commands.toggleNegativeHighlight(),
    };
  },
});
