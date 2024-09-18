import { Highlight } from "./base";

export const Positive = Highlight.extend({
  name: "positiveMark",

  addStorage() {
    return { color: "#007d5a" };
  },

  addOptions() {
    return {
      id: "",
      HTMLAttributes: {},
    };
  },

  addCommands() {
    return {
      setPositiveHighlight:
        (attributes) =>
        ({ commands }) => {
          console.log("setPositiveHighlight", attributes);

          return commands.setMark(this.name, attributes);
        },
      togglePositiveHighlight:
        (attributes) =>
        ({ commands }) => {
          return commands.toggleMark(this.name, attributes);
        },
      unsetPositiveHighlight:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Shift-p": () => this.editor.commands.togglePositiveHighlight(),
    };
  },
});
