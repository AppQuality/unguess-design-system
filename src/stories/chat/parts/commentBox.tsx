import styled from "styled-components";
import { ChatEditorArgs } from "../_types";
import { PropsWithChildren } from "react";
import { FloatingMenu } from "../../editor/floatingMenu";
import { Avatar } from "../../avatar";
import { useChatContext } from "../context/chatContext";
import { CommentBar } from "./bar";
import { CommentEditor } from "./editor";

const ChatBoxContainer = styled.div`
  display: flex;
  border-top: 1px solid ${({ theme }) => theme.palette.grey[200]};
  margin: ${({ theme }) => `0 -${theme.space.base * 4}px`};
  padding: ${({ theme }) => `${theme.space.base * 4}px ${theme.space.sm} 0`};
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
  placeholderOptions,
  ...props
}: PropsWithChildren<ChatEditorArgs>) => {
  const { children, hasInlineMenu, hasButtonsMenu, bubbleOptions, author, i18n } =
    props;
  const { editor, mentionableUsers } = useChatContext();

  return (
    <>
      {hasInlineMenu && (
        <FloatingMenu editor={editor} tippyOptions={{ ...bubbleOptions }} />
      )}
      <ChatBoxContainer>
        <div>
          <Avatar avatarType={author.avatarType ?? "text"}>
            {author.avatar}
          </Avatar>
        </div>
        <CommentEditor
          placeholderOptions={placeholderOptions}
          mentionableUsers={mentionableUsers}
          children={children}
          {...props}
        />
      </ChatBoxContainer>
      {hasButtonsMenu && <CommentBar editor={editor} i18n={i18n} />}
    </>
  );
};
