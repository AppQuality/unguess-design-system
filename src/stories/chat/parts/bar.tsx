import { useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as BoldIcon } from "../../../assets/icons/bold-fill.svg";
import { ReactComponent as ItalicIcon } from "../../../assets/icons/italic-fill.svg";
import { IconButton } from "../../buttons/icon-button";
import { Tooltip } from "../../tooltip";
import { ChatEditorArgs } from "../_types";
import { useChatContext } from "../context/chatContext";

const MenuContainer = styled.div`
  padding: ${({ theme }) => theme.space.xxs} 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const CommentBar = ({ i18n }: Partial<ChatEditorArgs>) => {
  const { editor } = useChatContext();
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
          isPill={false}
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
          isPill={false}
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
        <IconButton onClick={() => editor.commands.insertContent("@")}>
          <span>@</span>
        </IconButton>
      </Tooltip>
    </MenuContainer>
  );
};

export { CommentBar };
