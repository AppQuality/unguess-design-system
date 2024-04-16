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
import ThumbnailContainer from "./ThumbnailContainer";
import ReactDOM from "react-dom";
import { useState } from "react";
import { Lightbox } from "../../lightbox";
import { Slider } from "../../slider";

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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File>({} as File);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  if (!editor) return null;

  type MenuItem = {
    type: "bold" | "italic" | "mention" | "attachment";
  };

  const handleOpenLightbox = (file: File, index: number) => {
    if (!file) throw Error("Error with the image");

    setSelectedImage(file);
    setSelectedImageIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
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
            const thumbnailSection = document.createElement("div");
            thumbnailSection.className = "thumbnailSection";

            editor.view.dom.parentElement?.appendChild(thumbnailSection);

            ReactDOM.render(
              <ThumbnailContainer
                openLightbox={handleOpenLightbox}
                imagefiles={Array.from(files)}
              />,
              thumbnailSection
            );
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
      {isOpen && selectedImage && (
        <Lightbox onClose={closeLightbox}>
          <Lightbox.Header>{selectedImage.name}</Lightbox.Header>
          <Lightbox.Body>
            <Lightbox.Body.Main style={{ flex: 3 }}>
              <Slider
                prevArrow={<Slider.PrevButton isBright />}
                nextArrow={<Slider.NextButton isBright />}
                // onSlideChange={slideChange}
                //initialSlide={currentIndex}
              >
                <Slider.Slide>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt={`{{${selectedImage.name}}}`}
                  />
                </Slider.Slide>
              </Slider>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt={selectedImage.name}
              />
            </Lightbox.Body.Main>
          </Lightbox.Body>
          <Lightbox.Close aria-label="Close modal" />
        </Lightbox>
      )}
    </MenuContainer>
  );
};

export { CommentBar };
