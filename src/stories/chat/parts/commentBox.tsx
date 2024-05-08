import styled from "styled-components";
import {
  useEditor,
  EditorContent,
  Editor as TipTapEditor,
  Content,
} from "@tiptap/react";
import { ChatEditorArgs, FileItem } from "../_types";
import {
  KeyboardEvent as ReactKeyboardEvent,
  PropsWithChildren,
  useState,
  useReducer,
  useRef,
  useCallback,
} from "react";

import { Notification } from "../../notifications";
import { useToast } from "../../notifications";

import { FloatingMenu } from "../../editor/floatingMenu";
import { useChatContext } from "../context/chatContext";
import { CommentBar } from "./bar";
import { editorExtensions } from "./extensions";
import { EditorContainer } from "./containers";
import ThumbnailContainer from "./ThumbnailContainer";
import { Lightbox } from "../../lightbox";
import { Slider } from "../../slider";
import { Player } from "../../player";
import { ToastProvider } from "@zendeskgarden/react-notifications";
import { ToastProviderArgs } from "../../notifications/_types";
import { Spinner } from "../../loaders/spinner";

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
  const {
    editor,
    setEditor,
    mentionableUsers,
    triggerSave,
    thumbnails,
    addThumbnails
  } = useChatContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File>({} as File);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const ext = editorExtensions({ placeholderOptions, mentionableUsers });

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const slideChange = useCallback(
    (index: number) => {
      setSelectedImageIndex(index);
      videoRefs.current.forEach((ref) => {
        if (ref) {
          ref.pause();
        }
      });
    },
    [videoRefs]
  );
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

        event.preventDefault();

        const files = Array.from(event.dataTransfer.files).map((file) => {
          return Object.assign(file, { isLoadingMedia: false });
        });
        
        const mediaFiles: (FileItem)[] = files.filter(
          (file) => /^(image|video)\//.test(file.type)
        );

        if (mediaFiles.length === 0) return false;

        addThumbnails({ files: mediaFiles });

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
    }
  };

  if (!ed) return null;

  ed.on("create", ({ editor }) => setEditor(editor as TipTapEditor));
  ed.on("update", ({ editor }) => setEditor(editor as TipTapEditor));

  const mediaFiles = thumbnails.map((file) => {
    return Object.assign(file, { isLoadingMedia: file.isLoadingMedia });
  });

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
                onSlideChange={slideChange}
                initialSlide={selectedImageIndex}
              >
                {mediaFiles.map((item, index) => (
                  <Slider.Slide>
                    {item.type.includes("image") && (
                      <img
                        src={URL.createObjectURL(thumbnails[index])}
                        alt={`media ${item.name}`}
                      />
                    )}
                    {item.type.includes("video") && (
                      <Player
                        ref={(ref) => {
                          videoRefs.current.push(ref);
                        }}
                        url={URL.createObjectURL(thumbnails[index])}
                      />
                    )}
                  </Slider.Slide>
                ))}
              </Slider>
            </Lightbox.Body.Main>
          </Lightbox.Body>
          <Lightbox.Close aria-label="Close modal" />
        </Lightbox>
      )}
      <ChatBoxContainer>
        <EditorContainer editable style={{ marginLeft: 0, paddingBottom: 12 }}>
          {hasFloatingMenu && (
            <FloatingMenu editor={ed} tippyOptions={{ ...bubbleOptions }} />
          )}
          <EditorContent editor={ed} onKeyDown={onKeyDown}></EditorContent>
          <ThumbnailContainer openLightbox={handleOpenLightbox} />
        </EditorContainer>
      </ChatBoxContainer>
      {hasButtonsMenu && <CommentBar editor={ed} i18n={i18n} />}
    </>
  );
};
