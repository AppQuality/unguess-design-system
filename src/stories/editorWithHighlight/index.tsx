import { Editor, EditorContent } from "@tiptap/react";
import { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { FloatingMenu } from "./floatingMenu";
import { Search } from "./search";
import { useEditor } from "./useEditor";

const EditorWrapper = styled.div`
  ${Search.Style}

  border:none;
  .ProseMirror {
    background: transparent;
    border: none;
    outline: none;
    padding: 0;
    min-height: 0;
  }
`;

const EditorWithHighlight = ({ editor }: { editor: Editor }) => {
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
  return (
    <EditorWrapper>
      <EditorContent ref={ref} editor={editor} />
    </EditorWrapper>
  );
};

EditorWithHighlight.useEditor = useEditor;
EditorWithHighlight.Search = Search;
EditorWithHighlight.FloatingMenu = FloatingMenu;

export { EditorWithHighlight };
