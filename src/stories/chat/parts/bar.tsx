import styled from "styled-components";
import { Tooltip } from "../../tooltip";
import { ChatEditorArgs } from "../_types";
import { Editor } from "@tiptap/react";
import { isMac } from "../../theme/utils";
import { ReactComponent as BoldIcon } from "../../../assets/icons/bold-fill.svg";
import { ReactComponent as ItalicIcon } from "../../../assets/icons/italic-fill.svg";
import { ReactComponent as MentionIcon } from "../../../assets/icons/at-fill.svg";
import { ReactComponent as AttachmentIcon } from "../../../assets/icons/clipboard.svg";
import { IconButton } from "../../buttons/icon-button";
import { createSingleThumbnail } from "./commentBox";

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
        fileInput.accept = "image/*";
        fileInput.multiple = true;
        fileInput.click();

        fileInput.onchange = () => {
          const files = fileInput.files;
          if (files) {
            const thumbnail_container: HTMLElement | null =
              document.createElement("div");

            thumbnail_container.className = "thumbnail-container";

            thumbnail_container.style.display = "grid";
            thumbnail_container.style.gridTemplateColumns = "auto auto auto";
            thumbnail_container.style.overflowY = "scroll";
            thumbnail_container.style.justifyItems = "center";
            thumbnail_container.style.gap = "10px";
            thumbnail_container.style.backgroundColor = "white";
            thumbnail_container.style.width = "100%";

            Array.from(files).forEach((file) => {
              try {
                // create the thumbnail
                const img = document.createElement("img");
                img.src = URL.createObjectURL(file);
                img.style.width = "100%";
                img.style.height = "100%";
                img.style.borderRadius = "10%";
                const single_thumbnail = createSingleThumbnail(img);
                //add a red X to the thumbnail to eliminate the thumbnail
                const x = document.createElement("div");
                x.style.position = "absolute";
                x.style.top = "0";
                x.style.right = "0";
                x.style.color = "white";
                x.style.cursor = "pointer";
                x.style.fontSize = "15px";
                x.style.fontWeight = "100";
                x.style.opacity = "0";
                x.innerHTML = "╳";

                x.style.backgroundColor = "gray";
                x.style.borderRadius = "50%";
                x.style.width = "35px";
                x.style.height = "35px";
                x.style.display = "flex";
                x.style.justifyContent = "center";
                x.style.alignItems = "center";

                single_thumbnail.addEventListener("mouseover", () => {
                  x.style.opacity = "1";
                });
                single_thumbnail.addEventListener("mouseleave", () => {
                  x.style.opacity = "0";
                });

                x.addEventListener("click", () => {
                  thumbnail_container?.removeChild(single_thumbnail);
                  console.log("delete " + img.src);
                });
                single_thumbnail.appendChild(x);

                //add a label with the name of the image
                const label = document.createElement("div");
                label.style.position = "absolute";
                label.style.bottom = "0";
                label.style.left = "0";
                label.style.color = "black";
                label.style.marginBottom = "0";
                label.style.marginLeft = "5px";
                label.style.fontSize = "10px";
                label.style.fontWeight = "400";
                label.innerHTML = file.name;
                single_thumbnail.appendChild(label);
                thumbnail_container?.appendChild(single_thumbnail);
              } catch (error) {
                console.error("Error while uploading the image: ", error);
              }
              editor.view.dom.parentElement?.appendChild(thumbnail_container);
            });
          }
        };
        return;
      default:
        return;
    }
  };

  return (
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
        content={i18n?.menu?.attachment ?? "Upload a file (max size: ...)"}
        placement="top"
        type="light"
        size="small"
        hasArrow={false}
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
  );
};

export { CommentBar };
