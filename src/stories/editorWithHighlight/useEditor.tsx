import SearchAndReplace from "@sereneinserenade/tiptap-search-and-replace";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import { useEditor as useTiptapEditor } from "@tiptap/react";
import { useEffect } from "react";
import {
  getParsedContent,
  ObservationType,
  ParagraphType,
  SentenceType,
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
  }: {
    content?: ParagraphType[];
    observations?: ObservationType[];
    translations?: SentenceType[];
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

    console.log("currentWord", currentWord);
    console.log("currentTime", currentTime);

    ed.commands.updateCurrentActive({ currentWord });
  }, [currentTime, content, ed]);

  return ed;
};
