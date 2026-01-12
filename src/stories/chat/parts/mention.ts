import { mergeAttributes } from "@tiptap/core";
import Mention from "@tiptap/extension-mention";
import { SuggestedUser } from "../_types";

export const CustomMention = Mention.extend({
  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element) => Number(element.getAttribute("data-mention-id")),
        renderHTML: (attributes) => {
          if (!attributes.id) {
            return {};
          }

          return {
            "data-mention-id": attributes.id,
          };
        },
      },
      name: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-mention-name"),
        renderHTML: (attributes) => {
          if (!attributes.name) {
            return {};
          }

          return {
            "data-mention-name": attributes.name,
          };
        },
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: `mention[data-type="${this.name}"]`,
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    // In the future we can fetch other user data here, like avatar, user role, etc.
    const user = node.attrs as SuggestedUser;
    let outputText = "unkown";

    if (user) {
      outputText = `${this.options.suggestion.char || "@"}${user.name}`;
    }

    return [
      "mention",
      mergeAttributes(
        { "data-type": this.name },
        this.options.HTMLAttributes,
        HTMLAttributes
      ),
      outputText,
    ];
  },

  renderText({ node }) {
    const user = node.attrs as SuggestedUser;

    if (user) {
      return `${this.options.suggestion.char}${user.name}`;
    }

    return "unkown";
  },
});
