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

import { editorStyle } from "../shared/editorStyle";
import { ChatArgs } from "./_types";
import {
  KeyboardEvent as ReactKeyboardEvent,
  PropsWithChildren,
  useState,
  useCallback,
} from "react";
import { FloatingMenu } from "../editor/floatingMenu";
import { EditorFooter } from "./footer";
import { FauxInput } from "@zendeskgarden/react-forms";
import { Grid } from "../grid/grid";
import { Row } from "../grid/row";
import { Col } from "../grid/col";
import { Avatar } from "../avatar";
import { ChatContextProvider, useChatContext } from "./context/chatContext";

const EditorContainer = styled(FauxInput)<ChatArgs>`
  .ProseMirror {
    padding: ${({ theme }) => `${theme.space.xxs} ${theme.space.xs}`};
    background-color: #fff;
    min-height: 100px;
    outline: none;

    ${editorStyle}
  }
`;

const Chat = ({ onSave, ...props }: PropsWithChildren<ChatArgs>) => (
  <ChatContextProvider onSave={onSave}>
    <ChatContent {...props} />
  </ChatContextProvider>
);

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
const ChatContent = ({
  onSave,
  footerSaveText,
  placeholderOptions,
  ...props
}: PropsWithChildren<ChatArgs>) => {
  const { children, hasInlineMenu, bubbleOptions } = props;

  const { editor, setEditor, triggerSave } = useChatContext();

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
  ed.on("update", ({ editor }) => setEditor(editor as TipTapEditor));

  return (
    <div>
      {hasInlineMenu && (
        <FloatingMenu editor={ed} tippyOptions={{ ...bubbleOptions }} />
      )}
      <Grid>
        <Row>
          <Col size={"auto"}>
            <Avatar avatarType={"text"}>LC</Avatar>
          </Col>
          <Col style={{ padding: 0 }}>
            <EditorContainer>
              <EditorContent editor={ed} onKeyDown={onKeyDown} />
            </EditorContainer>
          </Col>
        </Row>
      </Grid>

      <EditorFooter saveText={footerSaveText} />
    </div>
  );
};

export { Chat };
