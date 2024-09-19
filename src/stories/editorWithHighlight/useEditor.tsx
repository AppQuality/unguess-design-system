import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { Content, useEditor as useTiptapEditor } from "@tiptap/react";
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
      extensions: [Document, Paragraph, Text, Word],
      editorProps: {
        handlePaste: () => true,
      },
      content,
    },
    deps
  );

  return ed;
};
