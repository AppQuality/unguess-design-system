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
} from "react";

import { FloatingMenu } from "../../editor/floatingMenu";
import { useChatContext } from "../context/chatContext";
import { CommentBar } from "./bar";
import { editorExtensions } from "./extensions";
import { EditorContainer } from "./containers";
import { EditorView } from "@tiptap/pm/view";
import ThumbnailContainer from "./ThumbnailContainer";
import { Lightbox } from "../../lightbox";

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

  const ext = editorExtensions({ placeholderOptions, mentionableUsers });

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
            openLightbox={setIsOpen}
            imagefiles={imageFiles}
          />,

          thumbnailSection
        );

        /*const node = view.state.schema.nodes.image.create({
          src: imageUrl,
        });
        const transaction = view.state.tr.replaceSelectionWith(node);
        view.dispatch(transaction);*/

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
      {isOpen && (
        <Lightbox onClose={() => setIsOpen(false)}>
          <Lightbox.Header title="Lightbox Title" />
          <Lightbox.Body>
            <div></div>
          </Lightbox.Body>
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

function deleteThumbnailAction(
  single_thumbnail: HTMLDivElement,
  thumbnail_container: HTMLElement,
  img: HTMLImageElement
) {
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
  return x;
}

function createThumbnailImage(file: File) {
  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.borderRadius = "10%";
  return img;
}

function createThumbnailContainer() {
  const thumbnail_container = document.createElement("div");
  thumbnail_container.className = "thumbnail-container";

  thumbnail_container.style.display = "grid";
  thumbnail_container.style.gridTemplateColumns = "auto auto auto";
  thumbnail_container.style.overflowY = "scroll";
  thumbnail_container.style.justifyItems = "center";
  thumbnail_container.style.gap = "10px";
  thumbnail_container.style.backgroundColor = "white";
  thumbnail_container.style.width = "100%";
  thumbnail_container.style.height = "150px";

  return thumbnail_container;
}

function createSingleThumbnail(img: HTMLImageElement) {
  const single_thumbnail = document.createElement("div");
  single_thumbnail.className = "thumbnail";
  single_thumbnail.style.position = "relative";
  single_thumbnail.style.justifyContent = "center";
  single_thumbnail.style.alignItems = "stretch";
  single_thumbnail.style.backgroundColor = "rgba(0,0,0,0.1)";
  single_thumbnail.style.maxHeight = "120px";
  single_thumbnail.style.maxWidth = "120px";
  single_thumbnail.style.minHeight = "90px";
  single_thumbnail.style.minWidth = "90px";
  single_thumbnail.style.padding = "5px 5px 15px 5px";
  single_thumbnail.style.borderRadius = "10%";
  single_thumbnail.appendChild(img);
  return single_thumbnail;
}

function showImageInline(file: File, view: EditorView) {
  const imageDataUrl = URL.createObjectURL(file);
  const node = view.state.schema.nodes.image.create({
    src: imageDataUrl,
  });
  const transaction = view.state.tr.replaceSelectionWith(node);
  view.dispatch(transaction);
}

export {
  createSingleThumbnail,
  createThumbnailContainer,
  createThumbnailImage,
  deleteThumbnailAction,
};
