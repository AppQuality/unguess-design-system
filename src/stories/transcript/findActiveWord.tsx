import { Node } from "prosemirror-model";

export const findActiveWord = (node: Node): Node | null => {
  let activeWord: Node | null = null;

  node.descendants((child) => {
    if (activeWord !== null) return false;
    if (child.type.name === "Word") {
      child.descendants((grandchild) => {
        if (activeWord !== null) return false;
        if (grandchild.type.name === "Active") {
          activeWord = child;
        }
      });
    }
  });

  return activeWord;
};
