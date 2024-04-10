import styled from "styled-components";
import {
  useEditor,
  EditorContent,
  Editor as TipTapEditor,
  Content,
} from "@tiptap/react";
import { ChatEditorArgs } from "../_types";
import { createPortal } from "react-dom";
import { KeyboardEvent as ReactKeyboardEvent, PropsWithChildren } from "react";

import { FloatingMenu } from "../../editor/floatingMenu";
import { useChatContext } from "../context/chatContext";
import { CommentBar } from "./bar";
import { editorExtensions } from "./extensions";
import { EditorContainer } from "./containers";
import { EditorView } from "@tiptap/pm/view";
import { LightboxArgs } from "../../lightbox/_types";
import { Lightbox } from "../../lightbox";
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
  const { editor, setEditor, mentionableUsers, triggerSave } = useChatContext();

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

        const thumbnail_container: HTMLElement | null =
          createThumbnailContainer();

        const files = Array.from(event.dataTransfer.files);
        const imageFiles = files.filter((file) => /^image\//.test(file.type));

        if (imageFiles.length === 0) return false;

        event.preventDefault();

        view.dom.parentElement?.appendChild(thumbnail_container);

        /*if (view.dom.parentElement) {
          window.alert("create portal");
          createPortal(<ThumbnailContainer />, view.dom.parentElement);
        }*/
        imageFiles.forEach(async (file) => {
          try {
            // create the thumbnail

            const img = createThumbnailImage(file);
            const single_thumbnail = createSingleThumbnail(img);
            const x = deleteThumbnailAction(
              single_thumbnail,
              thumbnail_container,
              img
            );

            console.log("carico su s3");

            const label = createMediaLabel(file);
            single_thumbnail.appendChild(x);
            single_thumbnail.appendChild(label);
            thumbnail_container?.appendChild(single_thumbnail);
          } catch (error) {
            console.error("Error while uploading the image: ", error);
          }
        });

        return false;
      },

      handlePaste: (view, event, slice) => {
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
      },
    },
    ...props,
  });

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      triggerSave();
      editor?.commands.clearContent();
      editor?.commands.deleteNode("thumbnail-container");
    }
  };

  if (!ed) return null;

  ed.on("create", ({ editor }) => setEditor(editor as TipTapEditor));
  ed.on("update", ({ editor }) => setEditor(editor as TipTapEditor));

  return (
    <>
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
function createMediaLabel(file: File) {
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
  return label;
}

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
