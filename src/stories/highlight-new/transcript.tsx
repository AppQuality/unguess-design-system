import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import {
  Content,
  EditorContent,
  Editor as TipTapEditor,
  useEditor,
} from "@tiptap/react";
import {
  PropsWithChildren,
  KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { getColor } from "../theme/utils";
import { HighlightArgs, HighlightRange } from "./_types";
import { EditorContainer } from "./editorContainer";
import { FloatingMenu } from "./floatingButton";
import { useHighlightContext } from "./highlightContext";
import { Highlight } from "./marks/base";
import { Positive } from "./marks/positive";
import { Word } from "./marks/word";
import { partFromSelection } from "./utils/partFromSelection";

const TranscriptContainer = styled.div`
  display: flex;
  border: none;
  margin: ${({ theme }) => `0 -${theme.space.base * 4}px`};
  padding: ${({ theme }) => `${theme.space.base * 4}px ${theme.space.sm} 0`};
  box-sizing: border-box;
  &::selection {
    background-color: ${({ theme }) =>
      getColor(theme.palette.grey, 400, undefined, 0.5)};
  }
`;

/**
 * Highlight is a wrapper around Editor component 
 * <br>
 * It's a rich text WYSIWYG editors.
 * <hr>
 * Used for this:
    - To add chat feature
    - To develop collaborative text editing
   
   Not for this:
    - Simple text input, use textarea instead.
 */
export const HighlightNew = (props: PropsWithChildren<HighlightArgs>) => {
  const [highlight, setHighlight] = useState<
    (HighlightRange & { text: string }) | null
  >(null);

  const { children, observations, words } = props;

  const {
    editor,
    setEditor,
    triggerSave,
    currentSelection,
    setCurrentSelection,
  } = useHighlightContext();

  useEffect(() => {
    // I want to create a text
  }, [observations, words]);

  const ed = useEditor({
    extensions: [Document, Paragraph, Text, Word, Highlight, Positive],
    content: (children as Content) || "",
    editorProps: {
      handlePaste: (view, event, slice) => {
        return true; // Prevent default paste behavior
      },
    },
    onSelectionUpdate({ editor, ...props }) {
      if (!editor) return;

      const selection = editor.state.selection;
      const { $from, $to } = selection;

      const range = partFromSelection($from.node().attrs, $to.node().attrs);
      const text = editor.state.doc.textBetween($from.start(), $to.end());

      if (!text) {
        console.log("🚀 ~ Emptyfalsy text:", text);
        setCurrentSelection(null);
        return;
      }

      if (!isNaN(range.from) && !isNaN(range.to)) {
        // console.log("setting highlight", range, text);
        setCurrentSelection({
          ...range,
          text,
        });
      }
    },
    ...props,
  });

  if (!ed) return null;

  ed.on("create", ({ editor }) => setEditor(editor as TipTapEditor));
  // ed.on("update", ({ editor }) => setEditor(editor as TipTapEditor));

  return (
    <TranscriptContainer>
      <EditorContainer
        editable
        style={{ marginLeft: 0, paddingBottom: 12 }}
        writingsuggestions={false}
      >
        <EditorContent editor={ed} />
        <FloatingMenu
          editor={ed}
          triggerSelection={() => {
            if (!currentSelection) return;
            props?.onSelectionButtonClick?.(currentSelection);
          }}
        />
      </EditorContainer>
    </TranscriptContainer>
  );
};
