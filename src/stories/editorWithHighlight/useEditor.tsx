import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import { Content, useEditor as useTiptapEditor } from "@tiptap/react";
import { Active } from "./nodes/active";
import { Annotation } from "./nodes/annotation";
import { Paragraph } from "./nodes/paragraph";
import { Word } from "./nodes/word";

export const useEditor = (
  {
    content,
    onSetCurrentTime,
  }: {
    content?: Content;
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
        Active({
          onSetCurrentTime,
        }),
        Annotation,
      ],
      editorProps: {
        handlePaste: () => true,
      },
      content,
    },
    deps
  );

  return ed;
};
