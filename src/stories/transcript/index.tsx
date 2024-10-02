import "@tiptap/core"; // Assicurati di importare il modulo prima
import { Editor, EditorContent } from "@tiptap/react";
import { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { Theme, getTheme } from "./extensions/theme";
import { FloatingMenu } from "./floatingMenu";
import { Search } from "./search";
import { useEditor } from "./useEditor";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    active: {
      setCurrentTime: (start: number) => ReturnType;
      updateCurrentActive: ({
        currentWord,
      }: {
        currentWord: { start: number; end: number };
      }) => ReturnType;
    };
    observation: {
      addObservation: ({
        id,
        title,
        color,
      }: {
        id: number;
        title: string;
        color?: string;
      }) => ReturnType;
    };
  }
}

const EditorWrapper = styled.div`
  border: none;
  .ProseMirror {
    background: transparent;
    border: none;
    outline: none;
    padding: 0;
    min-height: 0;
  }
`;

const Transcript = ({ editor }: { editor: Editor }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleDragStart = useCallback((event: DragEvent) => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      event.preventDefault();
    }
  }, []);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    currentRef.addEventListener("dragstart", handleDragStart);

    return () => {
      currentRef.removeEventListener("dragstart", handleDragStart);
    };
  }, [handleDragStart]);

  if (!editor) return null;

  const theme = getTheme(editor);
  const SearchStyleWrapper = theme.options.searchStyleWrapper;

  return (
    <SearchStyleWrapper>
      <EditorWrapper>
        <EditorContent ref={ref} editor={editor} />
      </EditorWrapper>
    </SearchStyleWrapper>
  );
};

Transcript.useEditor = useEditor;
Transcript.Search = Search;
Transcript.FloatingMenu = FloatingMenu;

export { Theme, Transcript };
