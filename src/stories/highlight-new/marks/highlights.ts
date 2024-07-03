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
    highlight: {
      /**
       * Set a highlight mark
       * @param attributes The highlight attributes
       * @example editor.commands.setHighlight({ color: 'red' })
       */
      setHighlight: (attributes?: { color: string }) => ReturnType;
      /**
       * Toggle a highlight mark
       * @param attributes The highlight attributes
       * @example editor.commands.toggleHighlight({ color: 'red' })
       */
      toggleHighlight: (attributes?: { color: string }) => ReturnType;
      /**
       * Unset a highlight mark
       * @example editor.commands.unsetHighlight()
       */
      unsetHighlight: () => ReturnType;
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

/**
 * This extension allows you to highlight text.
 * @see https://www.tiptap.dev/api/marks/highlight
 */
export const Highlight = Mark.create<HighlightOptions>({
  name: "baseMark",
  priority: 1000,
  addOptions() {
    return {
      color: "#ff489e",
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: (element) =>
          element.getAttribute("data-color") || element.style.backgroundColor,
        renderHTML: (attributes) => {
          return {
            "data-color": this.options.color,
            style: `background-color: ${attributes.color}; color: inherit`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "mark",
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
      setHighlight:
        (attributes) =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes);
        },
      toggleHighlight:
        (attributes) =>
        ({ commands }) => {
          return commands.toggleMark(this.name, attributes);
        },
      unsetHighlight:
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
        return this.editor.commands.toggleHighlight();
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
