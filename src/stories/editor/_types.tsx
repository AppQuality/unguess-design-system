import { PlaceholderOptions } from "@tiptap/extension-placeholder";
import { BubbleMenuProps, Editor, EditorOptions } from "@tiptap/react";

export interface EditorArgs extends Partial<EditorOptions> {
  placeholderOptions?: Partial<PlaceholderOptions>;
  hasInlineMenu?: boolean;
  bubbleOptions?: any;
  onSave?: (editor: Editor) => void;
}

export interface FloatingMenuArgs extends Partial<BubbleMenuProps> {}
