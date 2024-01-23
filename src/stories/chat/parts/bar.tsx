import styled from "styled-components";
import { Tooltip } from "../../tooltip";
import { ChatEditorArgs } from "../_types";
import { Editor } from "@tiptap/react";
import { EditorButton } from "./editorButton";
import { isMac } from "../../theme/utils";

const MenuContainer = styled.div`
  padding: ${({ theme }) => theme.space.xs} 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.space.xxs};
`;

const VerticalDivider = styled.div`
  width: 2px;
  height: 24px;
  background-color: ${({ theme }) => theme.palette.grey[300]};
  margin: 0 ${({ theme }) => theme.space.xs};
`;

const CommentBar = ({
  editor,
  i18n,
}: Partial<ChatEditorArgs> & {
  editor?: Editor;
}) => {

  if(!editor) return null;

  return (
    <MenuContainer>
      <Tooltip
        content={`${i18n?.menu?.bold ?? "Bold text"} ${isMac() ? "Cmd" : "Ctrl"} + B`}
        placement="top"
        type="light"
        size="small"
      >
        <EditorButton editor={editor} type="bold" />
      </Tooltip>
      <Tooltip
        content={`${i18n?.menu?.italic ?? "Italic text"} ${isMac() ? "Cmd" : "Ctrl"} + I`}
        placement="top"
        type="light"
        size="small"
      >
        <EditorButton editor={editor} type="italic" />
      </Tooltip>
      <VerticalDivider />
      <Tooltip
        content={i18n?.menu?.mention ?? "Add a mention"}
        placement="top"
        type="light"
        size="small"
      >
        <EditorButton editor={editor} type="mention" />
      </Tooltip>
    </MenuContainer>
  );
};

export { CommentBar };
