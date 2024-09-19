import { EditorContent } from "@tiptap/react";
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
  // useEffect(() => {
  //   if (!currentTime) return;
  //   if (!editor) return;

  //   const currentParagraph = content?.find((paragraph) =>
  //     paragraph.words.some(
  //       (word) =>
  //         word.start * 1000 <= currentTime && word.end * 1000 >= currentTime
  //     )
  //   );

  //   if (!currentParagraph) return;

  //   const currentWord = currentParagraph.words.find(
  //     (word) =>
  //       word.start * 1000 <= currentTime && word.end * 1000 >= currentTime
  //   );

  //   if (!currentWord) return;

  //   // editor.commands.unsetMark("active");
  //   // editor.commands.setMark("active");
  // }, [currentTime, content, editor]);

  if (!editor) return null;

  return (
    <>
      <EditorContent editor={editor} />
    </>
  );
};
