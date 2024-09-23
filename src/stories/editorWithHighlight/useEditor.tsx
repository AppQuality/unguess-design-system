import SearchAndReplace from "@sereneinserenade/tiptap-search-and-replace";
import { Content } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import { useEditor as useTiptapEditor } from "@tiptap/react";
import { useEffect } from "react";
import { Active } from "./nodes/active";
import { Observation } from "./nodes/observation";
import { Paragraph } from "./nodes/paragraph";
import { Word } from "./nodes/word";

export const useEditor = (
  {
    content,

    observations,
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
    observations?: {
      id: number;
      type: string;
      start: number;
      end: number;
      text: string;
    }[];
    currentTime?: number;
    onSetCurrentTime?: (time: number) => void;
  },
  deps?: React.DependencyList
) => {
  function getParsedContent(): Content | undefined {
    if (!content) return undefined;
    const result = {
      type: "doc",
      content: content.map((paragraph) => {
        function getWords() {
          return paragraph.words.map((word) => {
            const observationsInThisWord = observations?.filter(
              (observation) =>
                observation.start >= word.start && observation.end <= word.end
            );

            function getWordContent() {
              const textContent: Content = [
                {
                  type: "text",
                  text: `${word.word} `,
                },
              ];
              if (
                !observationsInThisWord ||
                observationsInThisWord.length === 0
              )
                return textContent;

              return observationsInThisWord.reduce(
                (acc: Content, observation) => {
                  return [
                    {
                      type: "Observation",
                      attrs: {
                        type: observation.type,
                        title: observation.text,
                      },
                      content: acc,
                    },
                  ];
                },
                textContent
              );
            }

            return {
              type: "Word",
              attrs: {
                "data-start": word.start,
                "data-end": word.end,
              },
              content: getWordContent(),
            };
          });
        }

        return {
          type: "Paragraph",
          attrs: {
            speakername: `Speaker ${paragraph.speaker}`,
            start: paragraph.start,
            end: paragraph.end,
          },
          content: getWords(),
        };
      }),
    };

    return result as Content;
  }

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
      content: getParsedContent(),
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
