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
import MediaLightBox from "./MediaLightbox";

export const acceptedMediaTypes = /^(image|video)\//;

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
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const ext = editorExtensions({ placeholderOptions, mentionableUsers });

  function handleEvent(data: DataTransfer | null) {
    if (!data || !data.files) return;
    addThumbnails({ files: createFiles(data.files) });
  }
  function checkFiles(data: FileList): File[] {
    const wrongFiles = Array.from(data).filter(
      (file) => !acceptedMediaTypes.test(file.type)
    );
    if (wrongFiles.length) {
      addToast(
        ({ close }) => (
          <Notification
            onClose={close}
            type="error"
            message={
              wrongFiles.length === 1
                ? `${props.messageBadFileFormat} - ${wrongFiles[0].name}`
                : `${props.messageBadFileFormatMultiple}`
            }
            isPrimary
          />
        ),
        { placement: "top" }
      );
    }
    return Array.from(data).filter((file) =>
      acceptedMediaTypes.test(file.type)
    );
  }

  function createFiles(data: FileList): FileItem[] {
    const files = checkFiles(data);
    return files.map((file) => {
      return Object.assign(file, {
        isLoadingMedia: false,
        internal_id: uuidv4(),
      });
    });
  }

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
        event.preventDefault();
        handleEvent(event.dataTransfer);
      },

      handlePaste: (view, event, slice) => {
        event.preventDefault();
        handleEvent(event.clipboardData);
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
        header={thumbnails[selectedImageIndex]?.name}
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
