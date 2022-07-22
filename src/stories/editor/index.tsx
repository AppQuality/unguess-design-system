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
import {
  KeyboardEvent as ReactKeyboardEvent,
  PropsWithChildren,
  useState,
} from "react";
import { FloatingMenu } from "./floatingMenu";
import { EditorHeader } from "./editorHeader";
import { EditorFooter } from "./editorFooter";

const EditorContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.primaryHue};
  border-radius: ${({ theme }) => theme.borderRadii.md};
  &:focus-within {
    outline: ${({ theme }) => theme.palette.blue["300"]};
    outline-style: solid;
  }

  .ProseMirror {
    padding: ${({ theme }) => theme.space.md};
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
const Editor = ({ onSave, headerTitle, footerSaveText, placeholderOptions, ...props }: PropsWithChildren<EditorArgs>) => {
  const { children, hasInlineMenu, bubbleOptions } = props;

  const [activeEditor, setActiveEditor] = useState<TipTapEditor | null>();

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      if (onSave && activeEditor) onSave(activeEditor);
    }
  };

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
        if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
          return true;
        }

        return false;
      },
    },
    ...props,
  });

  if (!ed) {
    return null;
  }

  // Add here because we want to keep also the listener from the props.
  ed.on("update", ({ editor }) => setActiveEditor(editor as TipTapEditor));

  return (
    <EditorContainer>
      <EditorHeader title={headerTitle}/>
      {hasInlineMenu && (
        <FloatingMenu editor={ed} tippyOptions={{ ...bubbleOptions }} />
      )}
      <EditorContent editor={ed} onKeyDown={onKeyDown} />
      <EditorFooter saveText={footerSaveText}/>
    </EditorContainer>
  );
};

export { Editor };
