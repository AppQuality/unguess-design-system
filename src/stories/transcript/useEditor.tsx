import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import { Extension, useEditor as useTiptapEditor } from "@tiptap/react";
import { useEffect, useRef } from "react";
import {
  ObservationClickPayload,
  ObservationRange,
  ObservationResize,
} from "./extensions/observationResize";
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
    editingObservationId,
    onObservationRangeChange,
    onObservationRangeCommit,
    onObservationClick,
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
    /** observation che mostra le maniglie per il ridimensionamento */
    editingObservationId?: number | null;
    onObservationRangeChange?: (range: ObservationRange) => void;
    onObservationRangeCommit?: (range: ObservationRange) => void;
    /** click su una parola evidenziata, per scegliere l'observation da modificare */
    onObservationClick?: (payload: ObservationClickPayload) => void;
  },
  deps?: React.DependencyList
) => {
  // l'editor viene creato una sola volta per deps: le callback passano da ref
  // per non usare closure vecchie
  const onRangeChangeRef = useRef(onObservationRangeChange);
  onRangeChangeRef.current = onObservationRangeChange;
  const onRangeCommitRef = useRef(onObservationRangeCommit);
  onRangeCommitRef.current = onObservationRangeCommit;
  const onObservationClickRef = useRef(onObservationClick);
  onObservationClickRef.current = onObservationClick;

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
        ObservationResize.configure({
          onRangeChange: (range) => onRangeChangeRef.current?.(range),
          onRangeCommit: (range) => onRangeCommitRef.current?.(range),
          onObservationClick: (payload) =>
            onObservationClickRef.current?.(payload),
        }),
      ],
      editorProps: {
        handlePaste: () => true,
      },
      content: parsedContent,
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

  useEffect(() => {
    if (!ed || ed.isDestroyed) return;
    ed.commands.setEditingObservation(editingObservationId ?? null);
  }, [editingObservationId, ed]);

  return ed;
};
