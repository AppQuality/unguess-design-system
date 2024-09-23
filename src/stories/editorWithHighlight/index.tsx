import { Fragment } from "@tiptap/pm/model";
import { Editor, EditorContent } from "@tiptap/react";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { FloatingMenu } from "./floatingMenu";
import { Search } from "./search";
import { useEditor } from "./useEditor";

const EditorWrapper = styled.div`
  ${Search.Style}
`;

const EditorWithHighlight = ({ editor }: { editor: Editor }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.addEventListener("dragstart", (event) => {
      // Controlla se c'è una selezione attiva
      const selection = window.getSelection();
      if (selection && selection.toString()) {
        event.preventDefault(); // Impedisce il drag della selezione
      }
    });
  }, [ref, ref.current]);

  if (!editor) return null;
  return (
    <EditorWrapper>
      <FloatingMenu
        editor={editor}
        onClick={(editor) => {
          const { state } = editor;
          const { tr } = state;
          const { from, to } = state.selection;
          state.doc.nodesBetween(from, to, (node, pos) => {
            // Controlla se il nodo è del tipo che vuoi sostituire (ad esempio "word")
            if (node.type.name === "Word") {
              // Crea il nodo "active"
              const annotationNode = state.schema.nodes.Observation.create(
                {},
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
          editor.view.dispatch(tr);
        }}
      />
      <EditorContent ref={ref} editor={editor} />
    </EditorWrapper>
  );
};

EditorWithHighlight.useEditor = useEditor;
EditorWithHighlight.Search = Search;

export { EditorWithHighlight };
