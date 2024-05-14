import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
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
import { Media } from "../../slider/index.stories";
import MediaLightBox from "./MediaLightbox";

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
    addThumbnails,
  } = useChatContext();

  const { addToast } = useToast();
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

        const files: FileItem[] = Array.from(event.dataTransfer.files).map(
          (file) => {
            return Object.assign(file, {
              isLoadingMedia: false,
              internal_id: uuidv4(),
            });
          }
        );
        const wrongFiles = files.filter(
          (file) => !/^(image|video)\//.test(file.type)
        );

        if (wrongFiles.length > 0) {
          for (const file of wrongFiles) {
            addToast(
              ({ close }) => (
                <Notification
                  onClose={close}
                  type="error"
                  message={`${props.messageBadFileFormat} - ${file.name}`}
                  isPrimary
                />
              ),
              { placement: "top" }
            );
          }
        }

        const mediaFiles: FileItem[] = files.filter((file) =>
          /^(image|video)\//.test(file.type)
        );

        if (mediaFiles.length === 0) return false;

        addThumbnails({ files: mediaFiles });

        return false;
      },

      handlePaste: (view, event, slice) => {

        if (!event.clipboardData || !event.clipboardData.items) return false;

        event.preventDefault();

        const files: FileItem[] = Array.from(event.clipboardData.files).map(
          (file) => {
            return Object.assign(file, {
              isLoadingMedia: false,
              internal_id: uuidv4(),
            });
          }
        );
        const wrongFiles = files.filter(
          (file) => !/^(image|video)\//.test(file.type)
        );

        if (wrongFiles.length > 0) {
          for (const file of wrongFiles) {
            addToast(
              ({ close }) => (
                <Notification
                  onClose={close}
                  type="error"
                  message={`${props.messageBadFileFormat} - ${file.name}`}
                  isPrimary
                />
              ),
              { placement: "top" }
            );
          }
        }

        const mediaFiles: FileItem[] = files.filter((file) =>
          /^(image|video)\//.test(file.type)
        );
        if (mediaFiles.length === 0) return false;
        
        addThumbnails({ files: mediaFiles });

        return false;
      },
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

  return (
    <>
      <MediaLightBox
        isOpen={isOpen}
        header={selectedImage.name}
        onClose={closeLightbox}
        slideChange={slideChange}
        selectedImageIndex={selectedImageIndex}
        thumbnails={thumbnails}
        videoRefs={videoRefs}
      />
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
