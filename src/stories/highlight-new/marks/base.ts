import {
  Mark,
  markInputRule,
  markPasteRule,
  mergeAttributes,
} from "@tiptap/core";

export interface HighlightOptions {
  color: string;
  /**
   * HTML attributes to add to the highlight element.
   * @default {}
   * @example { class: 'foo' }
   */
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    baseHighlight: {
      /**
       * Set a highlight mark
       * @param attributes The highlight attributes
       * @example editor.commands.setHighlight({ color: 'red' })
       */
      setBaseHighlight: (attributes?: { color: string }) => ReturnType;
      /**
       * Toggle a highlight mark
       * @param attributes The highlight attributes
       * @example editor.commands.toggleHighlight({ color: 'red' })
       */
      toggleBaseHighlight: (attributes?: { color: string }) => ReturnType;
      /**
       * Unset a highlight mark
       * @example editor.commands.unsetHighlight()
       */
      unsetBaseHighlight: () => ReturnType;
    };
    positiveHighlight: {
      /**
       * Set a highlight mark
       * @param attributes The highlight attributes
       * @example editor.commands.setHighlight({ color: 'red' })
       */
      setPositiveHighlight: (attributes?: { color: string }) => ReturnType;
      /**
       * Toggle a highlight mark
       * @param attributes The highlight attributes
       * @example editor.commands.toggleHighlight({ color: 'red' })
       */
      togglePositiveHighlight: (attributes?: { color: string }) => ReturnType;
      /**
       * Unset a highlight mark
       * @example editor.commands.unsetHighlight()
       */
      unsetPositiveHighlight: () => ReturnType;
    };
  }
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
  addOptions() {
    console.log("loaded");
    return {
      color: "#ff489e",
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      color: {
        default: "#ff489e",
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

  addKeyboardShortcuts() {
    return {
      "Mod-Shift-h": () => {
        console.log("fired");
        return this.editor.commands.toggleBaseHighlight();
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
