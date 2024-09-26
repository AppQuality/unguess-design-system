import { Node } from "@tiptap/core";
import { Fragment } from "@tiptap/pm/model";
import { ReactNodeViewRenderer, mergeAttributes } from "@tiptap/react";
import { Component } from "./Component";

export const Observation = Node.create({
  name: "Observation",
  content: "inline*",
  inline: true,

  addAttributes() {
    return {
      type: {
        default: "",
      },
      color: {
        default: "#909090",
      },
      title: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "observation",
      },
    ];
  },

  addCommands() {
    return {
      addObservation:
        ({ title, color }: { title: string; color?: string }) =>
        ({ tr, state, view }) => {
          const { from, to } = state.selection;
          state.doc.nodesBetween(from, to, (node, pos) => {
            // Controlla se il nodo è del tipo che vuoi sostituire (ad esempio "word")
            if (node.type.name === "Word") {
              // Crea il nodo "active"
              const annotationNode = state.schema.nodes.Observation.create(
                {
                  title,
                  color,
                },
                node.content
              );

              // Crea il nodo "word" aggiornato con "active" come figlio
              const updatedNode = node.copy(Fragment.from(annotationNode));

              // Sostituisci il nodo originale con quello aggiornato
              tr.replaceWith(
                tr.mapping.map(pos),
                tr.mapping.map(pos + node.nodeSize),
                updatedNode
              );
            }
          });
          view.updateState(view.state.apply(view.state.tr));
          return true;
        },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["observation", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});
