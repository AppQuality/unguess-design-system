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
    // // Step 1: Rimuovi "active" da tutte le "word" in ordine inverso
    // state.doc.descendants((node, pos, parent, index) => {
    //   if (
    //     node.type.name !== "Active" &&
    //     node.firstChild?.type.name === "Active"
    //   ) {
    //     const textContentFragment = node.firstChild.content;
    //     const updatedNode = node.copy(textContentFragment);

    //     // Sostituisci il nodo originale con quello aggiornato
    //     tr.replaceWith(
    //       tr.mapping.map(pos),
    //       tr.mapping.map(pos + node.nodeSize),
    //       updatedNode
    //     );
    //   }
    // });

    state.doc.nodesBetween(from, to, (node, pos) => {
      // Controlla se il nodo è del tipo che vuoi sostituire (ad esempio "word")
      if (node.type.name === "Word") {
        if (node.firstChild?.isLeaf) {
          const activeNode = state.schema.nodes.Active.create(
            {},
            node.firstChild
          );
          const updatedNode = node.copy(Fragment.from(activeNode));

          tr.replaceWith(
            tr.mapping.map(pos),
            tr.mapping.map(pos + node.nodeSize),
            updatedNode
          );
        } else {
          node.descendants((child, childPos) => {
            if (child.firstChild?.isLeaf && child.type.name !== "Active") {
              const activeNode = state.schema.nodes.Active.create(
                {},
                child.firstChild
              );
              const updatedNode = child.copy(Fragment.from(activeNode));
              tr.replaceWith(
                tr.mapping.map(childPos),
                tr.mapping.map(childPos + child.nodeSize),
                updatedNode
              );
            }
          });
        }
      }
    });

    dispatch(tr);
  }, [currentTime, content, editor]);

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
      <EditorContent editor={editor} />
    </>
  );
};
