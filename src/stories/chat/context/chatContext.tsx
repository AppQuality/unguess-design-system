import { Editor } from "@tiptap/react";
import React, { createContext, useContext, useMemo, useState } from "react";
import { SuggestedUser } from "../_types";

export type ChatContextType = {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  comment: string;
  setComment: (comment: string) => void;
  triggerSave: () => void;
  editor?: Editor;
  setEditor: React.Dispatch<React.SetStateAction<Editor | undefined>>;
  mentionableUsers: (props: { query: string }) => Promise<SuggestedUser[]>;
};

export const ChatContext = createContext<ChatContextType | null>(null);

export const ChatContextProvider = ({
  onSave,
  setMentionableUsers,
  children,
}: {
  onSave?: (editor: Editor) => void;
  children: React.ReactNode;
  setMentionableUsers: (props: { query: string }) => Promise<SuggestedUser[]>;
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
      mentionableUsers: setMentionableUsers,
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
