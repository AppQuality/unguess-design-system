import {
  useEditor,
  EditorContent,
  Editor as TipTapEditor,
} from "@tiptap/react";
import styled from "styled-components";

import Typography from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

import { editorStyle } from "./editorStyle";
import { EditorArgs } from "./_types";
import { PropsWithChildren, useEffect, useState } from "react";
import { FloatingMenu } from "./floatingMenu";

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
const Editor = ({ onSave, ...props }: PropsWithChildren<EditorArgs>) => {
  const { children, placeholderOptions, hasInlineMenu, bubbleOptions } = props;

  const [activeEditor, setEditor] = useState<TipTapEditor | null>();

  const ed = useEditor({
    extensions: [
      Typography,
      StarterKit,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What’s the title?";
          }

          return "Can you add some further context?";
        },
        ...placeholderOptions,
      }),
    ],
    content: children || "",
    editorProps: {
      handleKeyDown: (view, event: KeyboardEvent) => {
        if (event.ctrlKey && event.key === "Enter") {
          alert("Save this shit");

          if (onSave && activeEditor) onSave(activeEditor);
          else console.log("No onSave callback", onSave, activeEditor);
          return true;
        }

        return false;
      },
    },
    onUpdate: ({ editor }) => {
      setEditor(editor as TipTapEditor);
    },
    ...props,
  }, [children]);

  useEffect(() => {
    setEditor(ed);
  }, [ed]);

  if (!activeEditor) {
    return null;
  }

  return (
    <EditorContainer>
      {hasInlineMenu && (
        <FloatingMenu
          editor={activeEditor}
          tippyOptions={{ ...bubbleOptions }}
        />
      )}
      <EditorContent editor={activeEditor} />
    </EditorContainer>
  );
};

export { Editor };
