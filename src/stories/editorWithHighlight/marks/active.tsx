import { Mark } from "@tiptap/react";

export const Active = Mark.create<{}>({
  name: "active",
  addAttributes() {
    return {
      color: {
        default: "#ff0000",
        parseHTML: (element) => {
          return (
            element.getAttribute("data-color") || element.style.backgroundColor
          );
        },
        renderHTML: (attributes) => {
          return {
            "data-color": "#ff0000",
            style: `background-color: #ff0000; color: inherit; `,
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
    return [this.name, HTMLAttributes, 0];
  },
});
