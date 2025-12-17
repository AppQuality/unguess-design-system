import { PlaceholderOptions } from "@tiptap/extension-placeholder";
import { EditorOptions } from "@tiptap/react";
import { BubbleMenuProps } from "@tiptap/react/menus";

type validationStatus = "success" | "warning" | "error";

export type SuggestedUser = { id: number; name: string; email: string };

export interface ChatEditorArgs extends Partial<EditorOptions> {
  author: Author;
  placeholderOptions?: Partial<PlaceholderOptions>;
  hasFloatingMenu?: boolean;
  hasButtonsMenu?: boolean;
  bubbleOptions?: BubbleMenuProps["options"];
  i18n?: {
    menu?: {
      bold?: string;
      italic?: string;
      mention?: string;
      //react node
      attachment?: React.ReactNode;
    };
    mention?: {
      noResults?: string;
    };
  };
}

export interface Author {
  avatar: string;
  name?: string;
  avatarType?: "icon" | "image" | "text" | "system" /* default: text */;
}

export interface ChatArgs {
  chatBkg?: string;
}

export interface EditorHeaderArgs {
  title?: string;
  validation?: validationStatus;
}

export interface CommentMedia {
  id: string;
  type: string;
  name?: string;
  isLoadingMedia?: boolean;
  error?: string;
  url?: string;
}

export interface FloatingMenuArgs extends Partial<BubbleMenuProps> {}
