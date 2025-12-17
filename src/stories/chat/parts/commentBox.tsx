import {
  Content,
  Editor as TipTapEditor,
  EditorContent,
  useEditor,
} from "@tiptap/react";
import {
  KeyboardEvent as ReactKeyboardEvent,
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { FloatingMenu } from "../../editor/floatingMenu";
import { useChatContext } from "../context/chatContext";
import { useMedia } from "../hooks/useMedia";
import { ChatEditorArgs } from "../_types";
import { CommentBar } from "./bar";
import { EditorContainer } from "./containers";
import { editorExtensions } from "./extensions";
import MediaLightBox from "./MediaLightbox";
import ThumbnailContainer from "./ThumbnailContainer";

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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const { getMedia } = useMedia();
  const ext = editorExtensions({ placeholderOptions, mentionableUsers });

  function handleEvent(data: DataTransfer | null) {
    if (!data || !data.files) return;
    addThumbnails({ files: getMedia(data.files) });
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
  const handleOpenLightbox = (index: number) => {
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
            <FloatingMenu editor={ed} options={{ ...bubbleOptions }} />
          )}
          <EditorContent editor={ed} onKeyDown={onKeyDown}></EditorContent>
          <ThumbnailContainer openLightbox={handleOpenLightbox} />
        </EditorContainer>
      </ChatBoxContainer>
      {hasButtonsMenu && <CommentBar editor={ed} i18n={i18n} />}
    </>
  );
};
