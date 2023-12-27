import { PlaceholderOptions } from "@tiptap/extension-placeholder";
import { BubbleMenuProps, Editor, EditorOptions } from "@tiptap/react";

type validationStatus = "success" | "warning" | "error";

export interface ChatEditorArgs extends Partial<EditorOptions> {
  placeholderOptions?: Partial<PlaceholderOptions>;
  hasInlineMenu?: boolean;
  bubbleOptions?: any;
  author: Author;
}

export interface Author {
  avatar: string;
  name?: string;
  avatarType?: "icon" | "image" | "text" /* default: text */;
}

export interface ChatArgs {
  chatBkg?: string;
}

export interface EditorHeaderArgs {
  title?: string;
  validation?: validationStatus;
}

export interface FloatingMenuArgs extends Partial<BubbleMenuProps> {}
