import { Editor } from "@tiptap/react";
import React, { createContext, useContext, useMemo, useState } from "react";

export type ChatContextType = {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  comment: string;
  setComment: (comment: string) => void;
  triggerSave: () => void;
  editor?: Editor;
  setEditor: React.Dispatch<React.SetStateAction<Editor | undefined>>;
};

export const ChatContext = createContext<ChatContextType | null>(null);

export const ChatContextProvider = ({
  onSave,
  children,
}: {
  onSave?: (editor: Editor) => void;
  children: React.ReactNode;
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [editor, setEditor] = useState<Editor | undefined>();

  const chatContextValue = useMemo(
    () => ({
      isEditing,
      setIsEditing,
      comment,
      setComment,
      editor,
      setEditor,
      triggerSave: () => {
        if (editor && onSave) {
          onSave(editor);
          editor.commands.clearContent();
        }
      },
    }),
    [comment, setComment, isEditing, setIsEditing, editor, setEditor, onSave]
  );

  return (
    <ChatContext.Provider value={chatContextValue}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);

  if (!context) throw new Error("Provider not found for ChatContextProvider");

  return context; // Now we can use the context in the component, SAFELY.
};
