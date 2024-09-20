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
  }: {
    content?: Content;
  },
  deps?: React.DependencyList
) => {
  const ed = useTiptapEditor(
    {
      extensions: [Document, Paragraph, Text, Word, Active, Annotation],
      editorProps: {
        handlePaste: () => true,
      },
      content,
    },
    deps
  );

  return ed;
};
