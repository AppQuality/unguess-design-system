import { Editor } from "@tiptap/react";
import React, { createContext, useContext, useMemo, useState } from "react";
import { SuggestedUser } from "../_types";

export type ChatContextType = {
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
  const [editor, setEditor] = useState<Editor | undefined>();

  const chatContextValue = useMemo(
    () => ({
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
    [editor, setEditor, onSave, setMentionableUsers]
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
