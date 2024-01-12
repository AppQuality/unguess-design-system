import {
  useEditor,
  EditorContent,
  Editor as TipTapEditor,
  Content,
  ReactRenderer,
  EditorOptions,
} from "@tiptap/react";
import { PlaceholderOptions } from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react";
import { useChatContext } from "../context/chatContext";
import { CustomMention as Mention } from "./mention";
import { MentionList, MentionListRef, SuggestedUser } from "./mentionList";
import tippy, { type Instance as TippyInstance } from "tippy.js";
import { FauxInput } from "@zendeskgarden/react-forms";
import styled from "styled-components";
import { editorStyle, readOnlyStyle } from "../../shared/editorStyle";

const EditorContainer = styled(FauxInput)<{ editable: boolean }>`
  ${({ editable, theme }) =>
    !editable
      ? readOnlyStyle
      : `
    margin-left: ${theme.space.sm};
    padding: ${`${theme.space.xxs} ${theme.space.xs}`};
      
    `}

  .ProseMirror {
    background-color: transparent;
    min-height: 36px;
    outline: none;
    max-height: 210px;
    overflow-y: auto;

    ${editorStyle}
  }
`;

/**
 * Workaround for the current typing incompatibility between Tippy.js and Tiptap
 * Suggestion utility.
 *
 * @see https://github.com/ueberdosis/tiptap/issues/2795#issuecomment-1160623792
 *
 * Adopted from
 * https://github.com/Doist/typist/blob/a1726a6be089e3e1452def641dfcfc622ac3e942/stories/typist-editor/constants/suggestions.ts#L169-L186
 */
const DOM_RECT_FALLBACK: DOMRect = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0,
  toJSON() {
    return {};
  },
};

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
export const CommentEditor = ({
  placeholderOptions,
  children,
  ...props
}: {
  placeholderOptions?: Partial<PlaceholderOptions>;
  children?: ReactNode;
} & Partial<EditorOptions>) => {
  const { editor, setEditor, triggerSave } = useChatContext();
  const isEditable = props.editable !== false;

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      triggerSave();
      editor?.commands.clearContent();
    }
  };

  const ed = useEditor({
    extensions: [
      Typography,
      Link,
      StarterKit,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What’s the title?";
          }

          return "Can you add some further context?";
        },
        ...placeholderOptions,
      }),
      CharacterCount,
      Highlight,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Mention.configure({
        suggestion: {
          items: ({ query }): SuggestedUser[] => {
            return [
              {
                id: 1,
                fullName: "John Doe",
                avatar: "https://i.pravatar.cc/150?img=1",
              },
              {
                id: 2,
                fullName: "Jane Doe",
                avatar: "https://i.pravatar.cc/150?img=2",
              },
              {
                id: 3,
                fullName: "John Smith",
                avatar: "https://i.pravatar.cc/150?img=3",
              },
              {
                id: 4,
                fullName: "Jane Smith",
                avatar: "https://i.pravatar.cc/150?img=4",
              },
              {
                id: 5,
                fullName: "Pippo Baudo",
                avatar: "https://i.pravatar.cc/150?img=5",
              },
              {
                id: 6,
                fullName: "Pippo Franco",
                avatar: "https://i.pravatar.cc/150?img=6",
              },
              {
                id: 7,
                fullName: "Pippo Inzaghi",
                avatar: "https://i.pravatar.cc/150?img=7",
              },
              {
                id: 8,
                fullName: "Pippo Civati",
                avatar: "https://i.pravatar.cc/150?img=8",
              },
              {
                id: 9,
                fullName: "Pippo Delbono",
                avatar: "https://i.pravatar.cc/150?img=9",
              },
            ].filter((item) => {
              if (!query) return item;
              return item.fullName
                .toLowerCase()
                .startsWith(query.toLowerCase());
            });
          },
          render: () => {
            let component: ReactRenderer<MentionListRef> | undefined;
            let popup: TippyInstance | undefined;

            return {
              onStart: (props) => {
                component = new ReactRenderer(MentionList, {
                  props,
                  editor: props.editor,
                });

                if (!props.clientRect) {
                  return;
                }

                popup = tippy("body", {
                  getReferenceClientRect: () =>
                    props.clientRect?.() ?? DOM_RECT_FALLBACK,
                  appendTo: () => document.body,
                  content: component.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: "manual",
                  placement: "bottom-start",
                })[0];
              },

              onUpdate(props) {
                component?.updateProps(props);

                if (!props.clientRect) {
                  return;
                }

                popup?.setProps({
                  getReferenceClientRect: () =>
                    props.clientRect?.() ?? DOM_RECT_FALLBACK,
                });
              },

              onKeyDown(props) {
                if (props.event.key === "Escape") {
                  popup?.hide();

                  return true;
                }

                if (!component?.ref) {
                  return false;
                }
                return component.ref.onKeyDown(props);
              },

              onExit() {
                popup?.destroy();
                component?.destroy();

                // Remove references to the old popup and component upon destruction/exit.
                // (This should prevent redundant calls to `popup.destroy()`, which Tippy
                // warns in the console is a sign of a memory leak, as the `suggestion`
                // plugin seems to call `onExit` both when a suggestion menu is closed after
                // a user chooses an option, *and* when the editor itself is destroyed.)
                popup = undefined;
                component = undefined;
              },
            };
          },
        },
      }),
    ],
    content: (children as Content) || "",
    editorProps: {
      handleKeyDown: (view, event: KeyboardEvent) => {
        if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
          return true;
        }

        return false;
      },
    },
    ...props,
  });

  if (!ed) {
    return null;
  }

  // Add here because we want to keep also the listener from the props.
  ed.on("create", ({ editor }) => setEditor(editor as TipTapEditor));
  ed.on("update", ({ editor }) => setEditor(editor as TipTapEditor));

  return (
    <EditorContainer editable={isEditable}>
      <EditorContent editor={ed} onKeyDown={onKeyDown} />
    </EditorContainer>
  );
};
