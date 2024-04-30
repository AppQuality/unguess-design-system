import { Editor } from "@tiptap/react";
import React, { createContext, useContext, useMemo, useState } from "react";
import { SuggestedUser } from "../_types";

export type ChatContextType = {
  triggerSave: () => void;
  editor?: Editor;
  setEditor: React.Dispatch<React.SetStateAction<Editor | undefined>>;
  addThumbnails: (props: { files: File[] }) => void;
  removeThumbnail: (index: number) => void;
  thumbnails: File[];
  mentionableUsers: (props: { query: string }) => SuggestedUser[];
};

export const ChatContext = createContext<ChatContextType | null>(null);

export const ChatContextProvider = ({
  onSave,
  onFileUpload,
  setMentionableUsers,
  children,
}: {
  onSave?: (editor: Editor, mentions: SuggestedUser[]) => void;
  onFileUpload?: (files: File[]) => Promise<void>;
  children: React.ReactNode;
  setMentionableUsers: (props: { query: string }) => SuggestedUser[];
}) => {
  const [editor, setEditor] = useState<Editor | undefined>();
  const [thumbnails, setThumbnails] = useState<File[]>([]);

  const getMentions = (editor: Editor) => {
    const result: SuggestedUser[] = [];

    editor.state.doc.descendants((node) => {
      if (node.type.name === "mention") {
        // Add only if it's not already in the array
        if (!result.some((r) => r.id === node.attrs.id))
          result.push({
            id: node.attrs.id,
            name: node.attrs.name,
            email: node.attrs.email,
          });
      }
    });

    return result;
  };

  const chatContextValue = useMemo(
    () => ({
      editor,
      setEditor,
      thumbnails,
      addThumbnails: ({ files }: { files: File[] }) => {
        onFileUpload && onFileUpload(files);
        setThumbnails((prev) => [...prev, ...files]);
      },
      removeThumbnail: (index: number) =>
        setThumbnails(thumbnails.filter((_, i) => i !== index)),
      triggerSave: () => {
        if (editor && onSave && !editor.isEmpty) {
          onSave(editor, getMentions(editor));
          editor.commands.clearContent();
        }
      },
      mentionableUsers: setMentionableUsers,
    }),
    [
      editor,
      setEditor,
      onSave,
      setMentionableUsers,
      thumbnails,
      setThumbnails,
      onFileUpload,
    ]
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
