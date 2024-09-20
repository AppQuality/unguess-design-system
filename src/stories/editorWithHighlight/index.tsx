import { Fragment, Node } from "@tiptap/pm/model";
import { EditorContent } from "@tiptap/react";
import { useEffect, useRef } from "react";
import { FloatingMenu } from "./floatingMenu";
import { useEditor } from "./useEditor";

export const EditorWithHighlight = ({
  content,
  currentTime,
}: {
  currentTime?: number;
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

    const { state } = editor;

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
          function removeActiveDescendant(n: Node): Node {
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
        function getUpdatedNode(n: Node): Node {
          if (n.firstChild?.type.name === "text" && n.type.name !== "Active") {
            return n.copy(
              Fragment.from(
                state.schema.nodes.Active.create({}, n.content.firstChild)
              )
            );
          }
          let updatedContent: Fragment = Fragment.empty;
          n.content.forEach((child, index) => {
            updatedContent = updatedContent.addToEnd(getUpdatedNode(child));
          });
          return n.copy(updatedContent);
        }
        tr.replaceWith(
          tr.mapping.map(pos),
          tr.mapping.map(pos + node.nodeSize),
          getUpdatedNode(node)
        );
      }
    });

    editor.view.dispatch(tr);
  }, [currentTime, content, editor]);
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
