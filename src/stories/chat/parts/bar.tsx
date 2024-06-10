import styled from "styled-components";
import { Tooltip } from "../../tooltip";
import { ChatEditorArgs } from "../_types";
import { Editor } from "@tiptap/react";
import { isMac } from "../../theme/utils";
import { ReactComponent as BoldIcon } from "../../../assets/icons/bold-stroke.svg";
import { ReactComponent as ItalicIcon } from "../../../assets/icons/italic-stroke.svg";
import { ReactComponent as MentionIcon } from "../../../assets/icons/at-stroke.svg";
import { ReactComponent as AttachmentIcon } from "../../../assets/icons/clipboard.svg";
import { IconButton } from "../../buttons/icon-button";
import { useChatContext } from "../context/chatContext";
import { useMedia } from "../hooks/useMedia";
import { theme } from "../../theme";

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
  const { getMedia } = useMedia();
  if (!editor) return null;

  const handleBoldClick = () => {
    editor.chain().focus().toggleBold().run();
  };

  const handleItalicClick = () => {
    editor.chain().focus().toggleItalic().run();
  };

  const handleMentionClick = () => {
    const { from } = editor.state.selection;
    const char = from > 1 ? " @" : "@";
    editor.chain().focus().insertContent(char).run();
  };

  const handleAttachmentClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*,video/*";
    fileInput.multiple = true;
    fileInput.click();

    fileInput.onchange = () => {
      if (fileInput.files) {
        addThumbnails({ files: getMedia(fileInput.files) });
      }
    };
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
            onClick={handleMentionClick}
          >
            <MentionIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          style={{ textAlign: "center" }}
          content={
            i18n?.menu?.attachment ?? (
              <span>
                Upload images and video.{" "}
                <span style={{ color: theme.palette.grey[600] }}>
                  {" "}
                  <br /> Max size: 5GB{" "}
                </span>
              </span>
            )
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
            onClick={handleAttachmentClick}
          >
            <AttachmentIcon />
          </IconButton>
        </Tooltip>
      </MenuContainer>
    </>
  );
};

export { CommentBar };
