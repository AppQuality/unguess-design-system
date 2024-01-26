import { PlaceholderOptions } from "@tiptap/extension-placeholder";
import { BubbleMenuProps, EditorOptions } from "@tiptap/react";

type validationStatus = "success" | "warning" | "error";

export type SuggestedUser = { id: number; name: string; email:string };

export interface ChatEditorArgs extends Partial<EditorOptions> {
  placeholderOptions?: Partial<PlaceholderOptions>;
  hasFloatingMenu?: boolean;
  hasButtonsMenu?: boolean;
  bubbleOptions?: any;
  author: Author;
  i18n?: {
    menu?: {
      bold?: string;
      italic?: string;
      mention?: string;
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

export interface FloatingMenuArgs extends Partial<BubbleMenuProps> {}
