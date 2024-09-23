import SearchAndReplace from "@sereneinserenade/tiptap-search-and-replace";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import { useEditor as useTiptapEditor } from "@tiptap/react";
import { useEffect } from "react";
import { Active } from "./nodes/active";
import { Annotation } from "./nodes/annotation";
import { Paragraph } from "./nodes/paragraph";
import { Word } from "./nodes/word";

export const useEditor = (
  {
    content,
    currentTime,
    onSetCurrentTime,
  }: {
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
    currentTime?: number;
    onSetCurrentTime?: (time: number) => void;
  },
  deps?: React.DependencyList
) => {
  const ed = useTiptapEditor(
    {
      extensions: [
        Document,
        Paragraph,
        Text,
        Word,
        SearchAndReplace.configure(),
        Active({
          onSetCurrentTime,
        }),
        Annotation,
      ],
      editorProps: {
        handlePaste: () => true,
      },
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
    },
    deps
  );

  useEffect(() => {
    if (!currentTime) return;
    if (!ed) return;

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

    ed.commands.updateCurrentActive({ currentWord });
  }, [currentTime, content, ed]);

  return ed;
};
