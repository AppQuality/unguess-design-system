import SearchAndReplace from "@sereneinserenade/tiptap-search-and-replace";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import { Extension, useEditor as useTiptapEditor } from "@tiptap/react";
import { useEffect } from "react";
import { Theme } from "./extensions/theme";
import {
  ObservationType,
  ParagraphType,
  SentenceType,
  getParsedContent,
} from "./getParsedContent";
import { Active } from "./nodes/active";
import { Observation } from "./nodes/observation";
import { Paragraph } from "./nodes/paragraph";
import { Word } from "./nodes/word";

export const useEditor = (
  {
    content,
    observations,
    translations,
    currentTime,
    onSetCurrentTime,
    themeExtension,
  }: {
    content?: ParagraphType[];
    observations?: ObservationType[];
    translations?: SentenceType[];
    currentTime?: number;
    onSetCurrentTime?: (time: number) => void;
    themeExtension?: Extension;
  },
  deps?: React.DependencyList
) => {
  const ed = useTiptapEditor(
    {
      extensions: [
        Document,
        Paragraph,
        Text,
        themeExtension ? themeExtension : Theme.configure(),
        Word,
        SearchAndReplace.configure(),
        Active({
          onSetCurrentTime,
        }),
        Observation,
      ],
      editorProps: {
        handlePaste: () => true,
      },
      content: getParsedContent(content, observations, translations),
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
        word.start * 1000 <= currentTime && word.end * 1000 > currentTime
    );

    if (!currentWord) return;

    ed.commands.updateCurrentActive({ currentWord });
  }, [currentTime, content, ed]);

  return ed;
};
