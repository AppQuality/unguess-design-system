import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import { Extension, useEditor as useTiptapEditor } from "@tiptap/react";
import { useEffect, useRef } from "react";
import { Search } from "./extensions/search";
import { Theme } from "./extensions/theme";
import {
  ContentParser,
  ObservationType,
  ParagraphType,
  SentenceType,
  SentimentType,
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
    isEditable,
    numberOfSpeakers,
    sentiments,
  }: {
    content?: ParagraphType[];
    observations?: ObservationType[];
    translations?: SentenceType[];
    currentTime?: number;
    onSetCurrentTime?: (time: number) => void;
    themeExtension?: Extension;
    isEditable?: boolean;
    numberOfSpeakers?: number;
    sentiments?: SentimentType[];
  },
  deps?: React.DependencyList
) => {
  const parser = new ContentParser({
    observations,
    translations,
    sentiments,
    numberOfSpeakers,
  });
  const parsedContent = parser.getParsedContent(content);

  const ed = useTiptapEditor(
    {
      editable: isEditable ? isEditable : false,
      extensions: [
        Document,
        Paragraph,
        Text,
        themeExtension ? themeExtension : Theme.configure(),
        Word,
        Search.configure(),
        Active({
          onSetCurrentTime,
        }),
        Observation,
      ],
      editorProps: {
        handlePaste: () => true,
      },
      content: parsedContent,
    },
    deps
  );

  const setActiveWord = (editor: NonNullable<typeof ed>) => {
    if (!currentTime) return;

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

    editor.commands.updateCurrentActive({ currentWord });
  };

  // The editor is not rebuilt when the inputs change: swapping its DOM shrinks
  // the page for a moment and the browser clamps the scroll position of the
  // consumer. The document is replaced in place instead, and ProseMirror only
  // re-renders the words that actually changed. The small inputs are compared
  // by value so a consumer passing fresh literals on every render does not
  // replace the document (and drop the selection) every time.
  const inputsSignature = JSON.stringify([
    observations,
    translations,
    sentiments,
    numberOfSpeakers,
  ]);
  const applied = useRef<{
    editor: typeof ed;
    content: typeof content;
    signature: string;
  } | null>(null);
  useEffect(() => {
    if (!ed || ed.isDestroyed) return;
    const previous = applied.current;
    applied.current = { editor: ed, content, signature: inputsSignature };
    // A new editor is created with the current content already.
    if (!previous || previous.editor !== ed) return;
    if (previous.content === content && previous.signature === inputsSignature)
      return;
    if (!parsedContent) return;

    ed.commands.setContent(parsedContent, { emitUpdate: false });
    // The active word lives in the document, so it is lost with the content.
    setActiveWord(ed);
  }, [ed, content, inputsSignature]);

  useEffect(() => {
    if (!ed) return;
    setActiveWord(ed);
  }, [currentTime, content, ed]);

  return ed;
};
