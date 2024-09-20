import { Fragment } from "@tiptap/pm/model";
import { EditorContent } from "@tiptap/react";
import { useEffect, useRef } from "react";
import { FloatingMenu } from "./floatingMenu";
import { useEditor } from "./useEditor";

export const EditorWithHighlight = ({
  content,
  currentTime,
  onSetCurrentTime,
}: {
  currentTime?: number;
  onSetCurrentTime?: (time: number) => void;
  content?: {
    start: number;
    end: number;
    speaker: number;
    words: {
      start: number;
      end: number;
      word: string;
    }[];
  }[];
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const editor = useEditor({
    onSetCurrentTime,
    content: {
      type: "doc",
      content: content
        ? content.map((paragraph) => ({
            type: "Paragraph",
            attrs: {
              speakername: `Speaker ${paragraph.speaker}`,
              start: paragraph.start,
              end: paragraph.end,
            },
            content: paragraph.words.map((word) => ({
              type: "Word",
              attrs: {
                "data-start": word.start,
                "data-end": word.end,
              },
              content: [
                {
                  type: "text",
                  text: `${word.word} `,
                },
              ],
            })),
          }))
        : undefined,
    },
  });

  useEffect(() => {
    if (!currentTime) return;
    if (!editor) return;

    const currentParagraph = content?.find((paragraph) =>
      paragraph.words.some(
        (word) =>
          word.start * 1000 <= currentTime && word.end * 1000 >= currentTime
      )
    );

    if (!currentParagraph) return;

    const currentWord = currentParagraph.words.find(
      (word) =>
        word.start * 1000 <= currentTime && word.end * 1000 >= currentTime
    );

    if (!currentWord) return;

    editor.commands.updateCurrentActive({ currentWord });
  }, [currentTime, content, editor, editor?.commands]);
  
  useEffect(() => {
    if (!ref.current) return;

    ref.current.addEventListener("dragstart", (event) => {
      // Controlla se c'è una selezione attiva
      const selection = window.getSelection();
      if (selection && selection.toString()) {
        event.preventDefault(); // Impedisce il drag della selezione
      }
    });
  }, [ref]);

  if (!editor) return null;
  return (
    <>
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
              const annotationNode = state.schema.nodes.Annotation.create(
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
    </>
  );
};
