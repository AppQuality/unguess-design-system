import CharacterCount from "@tiptap/extension-character-count";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder, { PlaceholderOptions } from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import { ReactRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import tippy, { type Instance as TippyInstance } from "tippy.js";
import { colors } from "../../theme/colors";
import { getColor } from "../../theme/utils";
import { SuggestedUser } from "../_types";
import { CustomMention as Mention } from "./mention";
import { MentionList, MentionListRef } from "./mentionList";

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

export const editorExtensions = ({
  placeholderOptions,
  mentionableUsers,
}: {
  mentionableUsers: (props: { query: string }) => SuggestedUser[];
  placeholderOptions?: Partial<PlaceholderOptions>;
}) => {
  return [
    Typography,
    Link,
    StarterKit,
    Image.configure({
      inline: true,
      allowBase64: true,
      HTMLAttributes: {
        class: "comment-image",
      },
    }),
    Dropcursor.configure({
      color: getColor(colors.accentHue, 700),
      width: 3,
    }),
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
    Mention.configure({
      suggestion: {
        items: mentionableUsers,
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
                placement: "auto",
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
  ];
};
