import styled from "styled-components";
import { ReactComponent as BoldIcon } from "../../../assets/icons/bold-fill.svg";
import { ReactComponent as ItalicIcon } from "../../../assets/icons/italic-fill.svg";
import { IconButton } from "../../buttons/icon-button";
import { Tooltip } from "../../tooltip";
import { ChatEditorArgs } from "../_types";
import { useChatContext } from "../context/chatContext";
import { Editor } from "@tiptap/react";

const MentionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const MenuContainer = styled.div`
  padding: ${({ theme }) => theme.space.xxs} 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const CommentBar = ({
  editor,
  i18n,
}: Partial<ChatEditorArgs> & {
  editor?: Editor;
}) => {
  if (!editor) {
    return null;
  }

  return (
    <MenuContainer>
      <Tooltip
        content={i18n?.menu?.bold ?? "Bold text"}
        placement="top"
        type="light"
        size="small"
      >
        <IconButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isBasic={!editor.isActive("bold")}
          isPrimary={editor.isActive("bold")}
        >
          <BoldIcon />
        </IconButton>
      </Tooltip>
      <Tooltip
        content={i18n?.menu?.italic ?? "Italic text"}
        placement="top"
        type="light"
        size="small"
      >
        <IconButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isBasic={!editor.isActive("italic")}
          isPrimary={editor.isActive("italic")}
        >
          <ItalicIcon />
        </IconButton>
      </Tooltip>
      <Tooltip
        content={i18n?.menu?.mention ?? "Add a mention"}
        placement="top"
        type="light"
        size="small"
      >
        <IconButton
          onClick={() => {
            editor.chain().focus();
            const { from } = editor.state.selection;

            const char = from > 1 ? " @" : "@";
            editor.commands.insertContent(char);
          }}
        >
          <MentionIcon>@</MentionIcon>
        </IconButton>
      </Tooltip>
    </MenuContainer>
  );
};

export { CommentBar };
