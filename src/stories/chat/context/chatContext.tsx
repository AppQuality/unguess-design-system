import { Editor } from "@tiptap/react";
import React, { createContext, useContext, useMemo, useState } from "react";
import { FileItem, SuggestedUser } from "../_types";

export type ChatContextType = {
  triggerSave: () => void;
  editor?: Editor;
  setEditor: React.Dispatch<React.SetStateAction<Editor | undefined>>;
  addThumbnails: (props: {
    files: (FileItem)[];
  }) => void;
  removeThumbnail: (index: number) => void;
  thumbnails: (FileItem)[];
  mentionableUsers: (props: { query: string }) => SuggestedUser[];
  afterUploadCallback: (
    failed: string[]
  ) => void;
  //isMediaUploading: boolean; // Aggiunto il flag di caricamento dei media
  //setIsMediaUploading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ChatContext = createContext<ChatContextType | null>(null);
export interface Data {
  uploaded_ids?: number[],
  failed?: {name: string, errorCode: string}[]
}

export const ChatContextProvider = ({
  onSave,
  onFileUpload,
  setMentionableUsers,
  children,
}: {
  onSave?: (editor: Editor, mentions: SuggestedUser[]) => void;
  onFileUpload?: (
    files: (FileItem)[]
  ) => Promise<Data>;
  children: React.ReactNode;
  setMentionableUsers: (props: { query: string }) => SuggestedUser[];
  //setIsMediaUploading: (value: boolean) => void;
}) => {
  const [editor, setEditor] = useState<Editor | undefined>();
  const [thumbnails, setThumbnails] = useState<
    (FileItem)[]
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
      afterUploadCallback: (failed: string[]) => {
        setThumbnails(thumbnails.map((file) => {
          if (failed.includes(file.name)) {
            file.isLoadingMedia = false;
            //file.isError = true;
          } else {
            file.isLoadingMedia = false;
            //file.isError = false
          }
          return file;
        }));
      },
      //isMediaUploading, // Incluso nel valore del contesto
      //setIsMediaUploading, // Incluso nel valore del contesto
      addThumbnails: ({
        files,
      }: {
        files: (FileItem)[];
      }) => {
        files.forEach((file) => (file.isLoadingMedia = true));
        setThumbnails((prev) => [...prev, ...files]);

        if(onFileUpload) {
          onFileUpload(files).then((data: Data) => {
            const failed = data.failed?.map(f => f.name);
            
            setThumbnails((prev) => {
              return prev.map((file) => {
                file.isLoadingMedia = false;
                if (failed?.length && failed.includes(file.name)) {
                  file.isError = true;
                } else {
                  file.isError = false
                }
                return file;
              });
            });
          });
        }
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
      onFileUpload
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
