import styled from "styled-components";
import {
  useEditor,
  EditorContent,
  Editor as TipTapEditor,
  Content,
} from "@tiptap/react";
import { ChatEditorArgs } from "../_types";
import ReactDOM from "react-dom";
import {
  KeyboardEvent as ReactKeyboardEvent,
  PropsWithChildren,
  useState,
  createElement,
  useEffect,
} from "react";

import { FloatingMenu } from "../../editor/floatingMenu";
import { useChatContext } from "../context/chatContext";
import { CommentBar } from "./bar";
import { editorExtensions } from "./extensions";
import { EditorContainer } from "./containers";
import { EditorView } from "@tiptap/pm/view";
import ThumbnailContainer from "./ThumbnailContainer";
import { Lightbox } from "../../lightbox";
import { Slider } from "../../slider";
import { Player } from "../../player";
import { Button } from "../../buttons/button";

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
  const { children, hasFloatingMenu, hasButtonsMenu, bubbleOptions, i18n } =
    props;
  const { editor, setEditor, mentionableUsers, triggerSave } = useChatContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File>({} as File);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const ext = editorExtensions({ placeholderOptions, mentionableUsers });

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const handleOpenLightbox = (file: File, index: number) => {
    if (!file) throw Error("Error with the image");

    setSelectedImage(file);
    setSelectedImageIndex(index);
    setIsOpen(true);
  };

  const ed = useEditor({
    extensions: ext,
    content: (children as Content) || "",
    editorProps: {
      handleKeyDown: (view, event: KeyboardEvent) => {
        if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
          return true;
        }

        return false;
      },
      handleDrop: function (view, event, slice, moved) {
        if (!event.dataTransfer || !event.dataTransfer.files) return false;

        const files = Array.from(event.dataTransfer.files);
        const imageFiles = files.filter((file) => /^image\//.test(file.type));

        if (imageFiles.length === 0) return false;

        event.preventDefault();

        const thumbnailSection = document.createElement("div");
        thumbnailSection.className = "thumbnailSection";

        view.dom.parentElement?.appendChild(thumbnailSection);

        console.log("commentBox imageFiles", imageFiles);
        ReactDOM.render(
          <ThumbnailContainer
            imagefiles={imageFiles}
            openLightbox={handleOpenLightbox}
          />,

          thumbnailSection
        );

        return false;
      },

      /*handlePaste: (view, event, slice) => {
        if (!event.clipboardData || !event.clipboardData.items) return false;

        event.preventDefault();

        const items = Array.from(event.clipboardData.items);

        const imageItems = items.filter(
          (item) => item.type && item.type.startsWith("image/")
        );
        const textItem = items.find((item) => item.type === "text/plain");

        if (imageItems.length > 0) {
          imageItems.forEach((imageItem) => {
            const file = imageItem.getAsFile();
            if (file) {
              const imageUrl = URL.createObjectURL(file);
              const node = view.state.schema.nodes.image.create({
                src: imageUrl,
              });
              const transaction = view.state.tr.replaceSelectionWith(node);
              view.dispatch(transaction);
            }
          });
        } else if (textItem) {
          textItem.getAsString(async (text) => {
            const node = view.state.schema.text(text);
            const tr = view.state.tr;
            tr.replaceSelectionWith(node);
            view.dispatch(tr);
          });
        }

        return true;
      },*/
    },
    ...props,
  });

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      triggerSave();
      editor?.commands.clearContent();
      //todo: update the media comment id with the proper comment id
    }
  };

  if (!ed) return null;

  ed.on("create", ({ editor }) => setEditor(editor as TipTapEditor));
  ed.on("update", ({ editor }) => setEditor(editor as TipTapEditor));

  return (
    <>
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
      <ChatBoxContainer>
        <EditorContainer editable style={{ marginLeft: 0 }}>
          {hasFloatingMenu && (
            <FloatingMenu editor={ed} tippyOptions={{ ...bubbleOptions }} />
          )}
          <EditorContent editor={ed} onKeyDown={onKeyDown} />
        </EditorContainer>
      </ChatBoxContainer>
      {hasButtonsMenu && <CommentBar editor={ed} i18n={i18n} />}
    </>
  );
};
