import { Node } from "@tiptap/core";
import { Fragment } from "@tiptap/pm/model";
import { ReactNodeViewRenderer, mergeAttributes } from "@tiptap/react";
import { Node as PMNode } from "prosemirror-model";
import { Component } from "./Component";

export const Observation = Node.create({
  name: "Observation",
  content: "inline*",
  inline: true,

  addAttributes() {
    return {
      start: {
        default: 0,
      },
      end: {
        default: 0,
      },
      id: {
        default: 0,
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
        ({ id, title, color }: { id: number; title: string; color?: string }) =>
        ({ tr, state, view }) => {
          const { from, to } = state.selection;
          let firstWord: PMNode, lastWord: PMNode;
          state.doc.nodesBetween(from, to, (node, pos) => {
            if (node.type.name === "Word") {
              if (!firstWord) {
                firstWord = node;
              }
              lastWord = node;
            }
          });
          state.doc.nodesBetween(from, to, (node, pos) => {
            if (node.type.name === "Word") {
              const annotationNode = state.schema.nodes.Observation.create(
                {
                  start: firstWord.attrs["data-start"],
                  end: lastWord.attrs["data-end"],
                  id,
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
