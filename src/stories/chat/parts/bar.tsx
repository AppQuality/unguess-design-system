import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { Tooltip } from "../../tooltip";
import { ChatEditorArgs, FileItem } from "../_types";
import { Editor } from "@tiptap/react";
import { isMac } from "../../theme/utils";
import { ReactComponent as BoldIcon } from "../../../assets/icons/bold-stroke.svg";
import { ReactComponent as ItalicIcon } from "../../../assets/icons/italic-stroke.svg";
import { ReactComponent as MentionIcon } from "../../../assets/icons/at-stroke.svg";
import { ReactComponent as AttachmentIcon } from "../../../assets/icons/clipboard.svg";
import { IconButton } from "../../buttons/icon-button";
import { useChatContext } from "../context/chatContext";

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
  const { addThumbnails } = useChatContext();

  if (!editor) return null;

  type MenuItem = {
    type: "bold" | "italic" | "mention" | "attachment";
  };

  const getIcon = (type: MenuItem["type"]) => {
    switch (type) {
      case "bold":
        return <BoldIcon />;
      case "italic":
        return <ItalicIcon />;
      case "mention":
        return <MentionIcon />;
      case "attachment":
        return <AttachmentIcon />;
      default:
        return null;
    }
  };

  const handleClick = (type: MenuItem["type"]) => {
    switch (type) {
      case "bold":
        return editor.chain().focus().toggleBold().run();
      case "italic":
        return editor.chain().focus().toggleItalic().run();
      case "mention":
        const { from } = editor.state.selection;
        const char = from > 1 ? " @" : "@";
        return editor.chain().focus().insertContent(char).run();
      case "attachment":
        //open a file browser to select one or more images
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*,video/*";
        fileInput.multiple = true;
        fileInput.click();

        fileInput.onchange = () => {
          if (fileInput.files) {
            addThumbnails({
              files: Array.from(fileInput.files).map((file) => {
                return Object.assign(file, {
                  isLoadingMedia: true,
                  internal_id: uuidv4(),
                });
              }),
            });
          }
        };
        return;
      default:
        return;
    }
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
            onClick={() => handleClick("bold")}
          >
            {getIcon("bold")}
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
            onClick={() => handleClick("italic")}
          >
            {getIcon("italic")}
          </IconButton>
        </Tooltip>
        <VerticalDivider />
        <Tooltip
          content={i18n?.menu?.mention ?? "Add a mention"}
          placement="top"
          type="light"
          size="small"
          hasArrow={false}
        >
          <IconButton
            size={"small"}
            isBasic={!editor.isActive("mention")}
            isPrimary={editor.isActive("mention")}
            isPill={false}
            onClick={() => handleClick("mention")}
          >
            {getIcon("mention")}
          </IconButton>
        </Tooltip>
        <Tooltip
          content={
            i18n?.menu?.attachment ?? "Upload images and video. Max size: 5GB"
          }
          placement="top"
          type="light"
          size="small"
          hasArrow={true}
        >
          <IconButton
            size={"small"}
            isBasic={!editor.isActive("attachment")}
            isPrimary={editor.isActive("attachment")}
            isPill={false}
            onClick={() => handleClick("attachment")}
          >
            {getIcon("attachment")}
          </IconButton>
        </Tooltip>
      </MenuContainer>
    </>
  );
};

export { CommentBar };
