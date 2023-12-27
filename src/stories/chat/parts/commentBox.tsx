import {
  useEditor,
  EditorContent,
  Editor as TipTapEditor,
  Content,
} from "@tiptap/react";
import styled from "styled-components";

import Typography from "@tiptap/extension-typography";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";

import { editorStyle } from "../../shared/editorStyle";
import { ChatArgs, ChatEditorArgs } from "../_types";
import { KeyboardEvent as ReactKeyboardEvent, PropsWithChildren } from "react";
import { FloatingMenu } from "../../editor/floatingMenu";
import { FauxInput } from "@zendeskgarden/react-forms";
import { Avatar } from "../../avatar";
import { useChatContext } from "../context/chatContext";

const ChatBoxContainer = styled.div`
  display: flex;
  border-top: 1px solid ${({ theme }) => theme.palette.grey[200]};
  margin: ${({ theme }) => `0 -${theme.space.md}`};
  padding: ${({ theme }) => theme.space.md};
`;

const EditorContainer = styled(FauxInput)<ChatArgs>`
  margin-left: ${({ theme }) => theme.space.sm};
  .ProseMirror {
    padding: ${({ theme }) => `${theme.space.xxs} ${theme.space.xs}`};
    background-color: #fff;
    min-height: 36px;
    outline: none;
    max-height: 210px;
    overflow-y: auto;

    ${editorStyle}
  }
`;

/**
 * CommentBox is a wrapper around Editor component 
 * <br>
 * It's a rich text WYSIWYG editors.
 * <hr>
 * Used for this:
    - To add chat feature
    - To develop collaborative text editing
   
   Not for this:
    - Simple text input, use textarea instead.
 */
export const CommentBox = ({
  onSave,
  placeholderOptions,
  ...props
}: PropsWithChildren<ChatEditorArgs>) => {
  const { children, hasInlineMenu, bubbleOptions, author } = props;

  const { setEditor, triggerSave } = useChatContext();

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      triggerSave();
    }
  };

  const ed = useEditor({
    extensions: [
      Typography,
      Link,
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
      CharacterCount,
    ],
    content: (children as Content) || "",
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
  ed.on("create", ({ editor }) => setEditor(editor as TipTapEditor));
  ed.on("update", ({ editor }) => setEditor(editor as TipTapEditor));

  return (
    <>
      {hasInlineMenu && (
        <FloatingMenu editor={ed} tippyOptions={{ ...bubbleOptions }} />
      )}
      <ChatBoxContainer>
        <div>
          <Avatar avatarType={author.avatarType ?? "text"}>
            {author.avatar}
          </Avatar>
        </div>

        <EditorContainer>
          <EditorContent editor={ed} onKeyDown={onKeyDown} />
        </EditorContainer>
      </ChatBoxContainer>
    </>
  );
};
