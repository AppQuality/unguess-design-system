import { Node } from "@tiptap/core";

// export interface WordOptions {
//   start: number;
//   end: number;
//   isActive?: boolean;
// }

// export const Word = text<WordOptions>({
//   name: "word",

//   addGlobalAttributes() {
//     return [
//       {
//         attributes: {
//           timing: {
//             default: null,
//             parseHTML: (element) => {
//               const start = element.getAttribute("data-start") || 0;
//               const end = element.getAttribute("data-end") || 0;

//               return { start, end };
//             },
//             renderHTML: (attributes) => {
//               return {
//                 "data-start": attributes.start,
//                 "data-end": attributes.end,
//               };
//             },
//           },
//         },
//       },
//     ];
//   },
// });

/**
 * Extend the text extention to add start and end data attributes
 */

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
