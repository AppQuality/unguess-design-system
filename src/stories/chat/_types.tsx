import { PlaceholderOptions } from "@tiptap/extension-placeholder";
import { BubbleMenuProps, Editor, EditorOptions } from "@tiptap/react";

type validationStatus=  "success" | "warning" | "error";

export interface ChatArgs extends Partial<EditorOptions> {
  placeholderOptions?: Partial<PlaceholderOptions>;
  hasInlineMenu?: boolean;
  bubbleOptions?: any;
  footerSaveText?: string;
  onSave?: (editor: Editor) => void;
  triggerSave?: () => void;
}

export interface EditorHeaderArgs {
  title?: string;
  validation?: validationStatus;
}

export interface FloatingMenuArgs extends Partial<BubbleMenuProps> {}
