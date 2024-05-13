import { PlaceholderOptions } from "@tiptap/extension-placeholder";
import { BubbleMenuProps, EditorOptions } from "@tiptap/react";

type validationStatus = "success" | "warning" | "error";

export type SuggestedUser = { id: number; name: string; email: string };

export interface ChatEditorArgs extends Partial<EditorOptions> {
  author: Author;
  messageBadFileFormat: string;

  placeholderOptions?: Partial<PlaceholderOptions>;
  hasFloatingMenu?: boolean;
  hasButtonsMenu?: boolean;
  bubbleOptions?: any;
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

export interface FileItem extends File {
  isLoadingMedia: boolean;
  internalId: string;
  type: string;
  isError?: boolean;
  src?: string;
}

export interface FloatingMenuArgs extends Partial<BubbleMenuProps> {}
