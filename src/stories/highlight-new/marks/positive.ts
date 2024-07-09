import { Highlight } from "./base";

const hexToRgba = (hex: string, alpha?: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha || 0.5})`;
};

export const Positive = Highlight.extend({
  name: "positiveMark",

  addOptions() {
    return {
      color: "#007d5a",
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      color: {
        default: "#007d5a",
        parseHTML: (element) => {
          console.log("parseHTML", element);
          return (
            element.getAttribute("data-color") || element.style.backgroundColor
          );
        },
        renderHTML: (attributes) => {
          console.log("renderHTML", attributes);
          return {
            "data-color": this.options.color,
            style: `background-color: ${hexToRgba(
              attributes.color
            )}; color: inherit`,
          };
        },
      },
    };
  },

  addCommands() {
    return {
      setPositiveHighlight:
        (attributes) =>
        ({ commands }) => {
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
