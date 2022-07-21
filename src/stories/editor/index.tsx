import { useEditor, EditorContent } from "@tiptap/react";
import Typography from '@tiptap/extension-typography'
import StarterKit from "@tiptap/starter-kit";
import styled from "styled-components";
import { editorStyle } from "./editorStyle";
import { EditorArgs } from "./_types";

const EditorContainer = styled.div`
  .ProseMirror {
    padding: ${({ theme }) => theme.space.md};
    border: 2px solid ${({ theme }) => theme.palette.blue["300"]};
    border-radius: ${({ theme }) => theme.borderRadii.md};
    background-color: #fff;
    min-height: 100px;
    outline: none;

    ${editorStyle}
  }
`;

/**
 * Editor is a wrapper around TipTap/ProseMirror 
 * <br>
 * It's a rich text WYSIWYG editors.
 * <hr>
 * Used for this:
    - To allow text customization with markup supports
    - To develop collaborative text editing
   
   Not for this:
    - Simple text input, use textarea instead.
 */
const Editor = (props: EditorArgs) => {
  const { content, onUpdate } = props;
  const editor = useEditor({
    extensions: [
      Typography,
      StarterKit
    ],
    content: content || "<p>Hello World!</p>",
    onUpdate,
  });

  if (!editor) {
    return null;
  }

  return (
    <EditorContainer>
      <EditorContent editor={editor} />
    </EditorContainer>
  );
};

export { Editor };
