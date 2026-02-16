import styled from "styled-components";
import { Tooltip } from "../tooltip";
import { Editor } from "@tiptap/react";
import { EditorArgs } from "./_types";
import { isMac } from "../theme/utils";
import { ReactComponent as BoldIcon } from "../../assets/icons/bold-stroke.svg";
import { ReactComponent as ItalicIcon } from "../../assets/icons/italic-stroke.svg";
import { IconButton } from "../buttons/icon-button";
import { theme } from "../theme";

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

const CommandBar = ({
  editor,
  i18n,
}: Partial<EditorArgs> & {
  editor?: Editor;
}) => {
  if (!editor) return null;

  const handleBoldClick = () => {
    editor.chain().focus().toggleBold().run();
  };

  const handleItalicClick = () => {
    editor.chain().focus().toggleItalic().run();
  };

  return (
    <>
      <MenuContainer id="menu-container">
        <Tooltip
          content={`${i18n?.menu?.bold ?? "Bold text"} ${
            isMac() ? "Cmd" : "Ctrl"
          } + B`}
          placement="top"
          type="light"
          size="small"
          hasArrow={false}
        >
          <IconButton
            size={"small"}
            isBasic={!editor.isActive("bold")}
            isPrimary={editor.isActive("bold")}
            isPill={false}
            onClick={handleBoldClick}
          >
            <BoldIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          content={`${i18n?.menu?.italic ?? "Italic text"} ${
            isMac() ? "Cmd" : "Ctrl"
          } + I`}
          placement="top"
          type="light"
          size="small"
          hasArrow={false}
        >
          <IconButton
            size={"small"}
            isBasic={!editor.isActive("italic")}
            isPrimary={editor.isActive("italic")}
            isPill={false}
            onClick={handleItalicClick}
          >
            <ItalicIcon />
          </IconButton>
        </Tooltip>
      </MenuContainer>
    </>
  );
};

export { CommandBar };
