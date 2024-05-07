import { Editor } from "@tiptap/react";
import React, { createContext, useContext, useMemo, useState } from "react";
import { SuggestedUser } from "../_types";

export type ChatContextType = {
  triggerSave: () => void;
  editor?: Editor;
  setEditor: React.Dispatch<React.SetStateAction<Editor | undefined>>;
  addThumbnails: (props: {
    files: (File & { isLoadingMedia: boolean })[];
  }) => void;
  removeThumbnail: (index: number) => void;
  thumbnails: (File & { isLoadingMedia: boolean })[];
  mentionableUsers: (props: { query: string }) => SuggestedUser[];
  setMediaStatus: (
    files: (File & { isLoadingMedia: boolean })[],
    index: number
  ) => void;
  //isMediaUploading: boolean; // Aggiunto il flag di caricamento dei media
  //setIsMediaUploading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ChatContext = createContext<ChatContextType | null>(null);

export const ChatContextProvider = ({
  onSave,
  onFileUpload,
  setMentionableUsers,
  children,
}: {
  onSave?: (editor: Editor, mentions: SuggestedUser[]) => void;
  onFileUpload?: (
    files: (File & { isLoadingMedia: boolean })[]
  ) => Promise<void>;
  children: React.ReactNode;
  setMentionableUsers: (props: { query: string }) => SuggestedUser[];
  //setIsMediaUploading: (value: boolean) => void;
}) => {
  const [editor, setEditor] = useState<Editor | undefined>();
  const [thumbnails, setThumbnails] = useState<
    (File & { isLoadingMedia: boolean })[]
  >([]);
  //const [isMediaUploading, setIsMediaUploading] = useState<boolean>(false);

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
      setMediaStatus: (
        files: (File & { isLoadingMedia: boolean })[],
        index: number
      ) => {
        files[index].isLoadingMedia = false;
      },
      //isMediaUploading, // Incluso nel valore del contesto
      //setIsMediaUploading, // Incluso nel valore del contesto
      addThumbnails: ({
        files,
      }: {
        files: (File & { isLoadingMedia: boolean })[];
      }) => {
        onFileUpload && onFileUpload(files);
        /* const media = files.map((file) => ({
            ...file,
            isLoadingMedia: false,
          }));
          media[0].isLoadingMedia = false;*/
        //setIsMediaUploading(true);
        files.forEach((file) => (file.isLoadingMedia = false));
        setThumbnails((prev) => [...prev, ...files]);
        //setIsMediaUploading(false);
      },

      removeThumbnail: (index: number) =>
        setThumbnails(thumbnails.filter((_, i) => i !== index)),
      triggerSave: () => {
        if (editor && onSave && !editor.isEmpty) {
          onSave(editor, getMentions(editor));
          editor.commands.clearContent();
          setThumbnails([]);
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
      //setIsMediaUploading,
      //isMediaUploading,
    ]
  );

  console.log("thumbnails: ", thumbnails);

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
