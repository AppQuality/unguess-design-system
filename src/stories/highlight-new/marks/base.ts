import {
  Mark,
  markInputRule,
  markPasteRule,
  mergeAttributes,
} from "@tiptap/core";

export interface HighlightOptions {
  id: string;
  /**
   * HTML attributes to add to the highlight element.
   * @default {}
   * @example { class: 'foo' }
   */
  HTMLAttributes: Record<string, any>;
}

/**
 * Matches a highlight to a ==highlight== on input.
 */
export const inputRegex = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))$/;

/**
 * Matches a highlight to a ==highlight== on paste.
 */
export const pasteRegex = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))/g;

// Apply a fixed opacity to the color
const hexToRgba = (hex: string, alpha?: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha || 0.5})`;
};

/**
 * This extension allows you to highlight text.
 * @see https://www.tiptap.dev/api/marks/highlight
 */
export const Highlight = Mark.create<HighlightOptions>({
  name: "mark",
  priority: 1000,

  addStorage() {
    return { color: "#ff489e" };
  },

  addOptions() {
    return {
      id: "",
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      color: {
        default: this.storage.color,
        parseHTML: (element) => {
          console.log("parseHTML", element);
          return (
            element.getAttribute("data-color") || element.style.backgroundColor
          );
        },
        renderHTML: (attributes) => {
          return {
            "data-color": this.storage.color,
            style: `background-color: ${hexToRgba(
              this.storage.color
            )}; color: inherit; `,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-mark="mark"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      this.name,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setBaseHighlight:
        (attributes) =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes);
        },
      toggleBaseHighlight:
        (attributes) =>
        ({ commands }) => {
          return commands.toggleMark(this.name, attributes);
        },
      unsetBaseHighlight:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },

  addInputRules() {
    return [
      markInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ];
  },

  addPasteRules() {
    return [
      markPasteRule({
        find: pasteRegex,
        type: this.type,
      }),
    ];
  },
});
