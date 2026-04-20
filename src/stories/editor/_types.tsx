import { PlaceholderOptions } from "@tiptap/extension-placeholder";
import { EditorOptions } from "@tiptap/react";
import { BubbleMenuProps } from "@tiptap/react/menus";
import type { Editor } from "@tiptap/core";

type validationStatus = "success" | "warning" | "error";

export interface EditorChainedCommands {
  focus: () => EditorChainedCommands;
  toggleHeading: (options: { level: 1 | 2 | 3 | 4 | 5 | 6 }) => EditorChainedCommands;
  toggleBold: () => EditorChainedCommands;
  toggleItalic: () => EditorChainedCommands;
  toggleBlockquote: () => EditorChainedCommands;
  run: () => boolean;
}

/**
 * Extended Editor interface that includes type-safe chained commands.
 * Use this interface instead of the base Editor type when you need to use
 * chained commands in projects where TipTap extensions may not be installed.
 * 
 * @example
 * ```typescript
 * import { EditorWithExtensions } from '@unguess/design-system';
 * 
 * const handleBold = (editor: EditorWithExtensions) => {
 *   editor.chain().focus().toggleBold().run();
 * };
 * ```
 */
export interface EditorWithExtensions extends Omit<Editor, 'chain'> {
  chain: () => EditorChainedCommands;
}

export interface EditorArgs extends Partial<EditorOptions> {
  placeholderOptions?: Partial<PlaceholderOptions>;
  hasInlineMenu?: boolean;
  bubbleOptions?: any;
  headerTitle?: string;
  footerSaveText?: string;
  /** Applies validation state styling */
  validation?: validationStatus;
  onSave?: (editor: Editor) => void;
  disableSaveShortcut?: boolean;
  contentType?: "json" | "markdown";
}

export interface EditorHeaderArgs {
  title?: string;
  validation?: validationStatus;
}

export interface FloatingMenuArgs extends Partial<BubbleMenuProps> {}

export interface EditorRef {
  getEditor : () => EditorWithExtensions | null;
}
