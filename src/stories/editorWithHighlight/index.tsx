import { Fragment } from "@tiptap/pm/model";
import { EditorContent } from "@tiptap/react";
import { useEffect } from "react";
import { FloatingMenu } from "./floatingMenu";
import { useEditor } from "./useEditor";

export const EditorWithHighlight = ({
  content,
  currentTime,
}: {
  currentTime?: number;
  content?: {
    words: {
      start: number;
      end: number;
      word: string;
    }[];
  }[];
}) => {
  const editor = useEditor({
    content: {
      type: "doc",
      content: content
        ? content.map((paragraph) => ({
            type: "paragraph",
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

    const node = editor.$node("Word", {
      "data-start": currentWord.start,
      "data-end": currentWord.end,
    });

    if (!node) return;

    const { from, to } = node;
    const { state } = editor;

    const dispatch = editor.view.dispatch;

    const { tr } = state;
    // Step 1: Rimuovi "active" da tutte le "word" in ordine inverso
    state.doc.descendants((node, pos, parent, index) => {
      if (node.type.name === "Word") {
        let hasActive = false;

        // Itera sui figli del nodo "word" e controlla se contiene "active"
        node.content.forEach((child) => {
          if (child.type.name === "Active") {
            hasActive = true;
          }
        });

        if (hasActive) {
          // Estrai il testo dal nodo "word" e crea un nuovo nodo senza "active"
          const textContent = node.textContent;
          const updatedWordNode = state.schema.nodes.Word.create(
            null,
            state.schema.text(textContent)
          );

          // Sostituisci il nodo "word" con solo il testo
          tr.replaceWith(
            tr.mapping.map(pos),
            tr.mapping.map(pos + node.nodeSize),
            updatedWordNode
          );
        }
      }
    });

    state.doc.nodesBetween(from, to, (node, pos) => {
      // Controlla se il nodo è del tipo che vuoi sostituire (ad esempio "word")
      if (node.type.name === "Word") {
        // Crea il nodo "active"
        const activeNode = state.schema.nodes.Active.create({}, node.content);

        // Crea il nodo "word" aggiornato con "active" come figlio
        const updatedNode = node.copy(Fragment.from(activeNode));

        // Sostituisci il nodo originale con quello aggiornato
        tr.replaceWith(
          tr.mapping.map(pos),
          tr.mapping.map(pos + node.nodeSize),
          updatedNode
        );
      }
    });

    dispatch(tr);
  }, [currentTime, content, editor]);

  if (!editor) return null;

  return (
    <>
      <FloatingMenu editor={editor} onClick={() => {}} />
      <EditorContent editor={editor} />
    </>
  );
};
