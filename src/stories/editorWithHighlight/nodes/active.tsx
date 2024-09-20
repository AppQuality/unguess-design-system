import { Node } from "@tiptap/core";
import { Fragment, Node as PMNode } from "@tiptap/pm/model";

export const Active = ({
  onSetCurrentTime,
}: {
  onSetCurrentTime?: (time: number) => void;
}) =>
  Node.create({
    name: "Active",
    content: "inline*",
    inline: true,
    parseHTML() {
      return [
        {
          tag: "span",
        },
      ];
    },
    renderHTML({ node }) {
      return [
        "active",
        {
          style: "background-color: #ff0000;",
        },
        0,
      ];
    },

    addCommands() {
      return {
        setCurrentTime: (start: number) => () => {
          if (onSetCurrentTime) onSetCurrentTime(start);
          return true;
        },
        updateCurrentActive:
          ({ currentWord }: { currentWord: { start: number; end: number } }) =>
          ({ state, view }) => {
            const { tr } = state;

            // trova il nodo "active"
            state.doc.descendants((node, pos) => {
              if (node.type.name === "Word") {
                // check if the node has an "active" descendant
                let hasActiveDescendant = false;
                node.descendants((child) => {
                  hasActiveDescendant =
                    hasActiveDescendant || child.type.name === "Active";
                });

                if (hasActiveDescendant) {
                  // remove the "active" descendant
                  function removeActiveDescendant(n: PMNode): PMNode {
                    if (n.firstChild?.type.name === "Active") {
                      const textContent = n.textContent;
                      const textNode = state.schema.text(textContent);
                      return n.copy(Fragment.from(textNode));
                    }
                    let updatedContent: Fragment = Fragment.empty;
                    n.content.forEach((child) => {
                      updatedContent = updatedContent.addToEnd(
                        removeActiveDescendant(child)
                      );
                    });
                    return n.copy(updatedContent);
                  }

                  console.log("removing active descendant");
                  tr.replaceWith(
                    tr.mapping.map(pos),
                    tr.mapping.map(pos + node.nodeSize),
                    removeActiveDescendant(node)
                  );
                }
              }
              if (
                node.type.name === "Word" &&
                node.attrs["data-start"] === currentWord.start &&
                node.attrs["data-end"] === currentWord.end
              ) {
                function getUpdatedNode(n: PMNode): PMNode {
                  if (
                    n.firstChild?.type.name === "text" &&
                    n.type.name !== "Active"
                  ) {
                    return n.copy(
                      Fragment.from(
                        state.schema.nodes.Active.create(
                          {},
                          n.content.firstChild
                        )
                      )
                    );
                  }
                  let updatedContent: Fragment = Fragment.empty;
                  n.content.forEach((child, index) => {
                    updatedContent = updatedContent.addToEnd(
                      getUpdatedNode(child)
                    );
                  });
                  return n.copy(updatedContent);
                }
                console.log("adding active descendant");
                tr.replaceWith(
                  tr.mapping.map(pos),
                  tr.mapping.map(pos + node.nodeSize),
                  getUpdatedNode(node)
                );
              }
            });

            view.updateState(view.state.apply(view.state.tr));
            return true;
          },
      };
    },
  });
