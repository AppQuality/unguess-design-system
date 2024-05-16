import { Editor } from "@tiptap/react";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CommentMedia, SuggestedUser } from "../_types";

export type ChatContextType = {
  triggerSave: () => void;
  editor?: Editor;
  setEditor: React.Dispatch<React.SetStateAction<Editor | undefined>>;
  addThumbnails: (props: { files: CommentMedia[] }) => void;
  removeThumbnail: (index: number) => void;
  thumbnails: CommentMedia[];
  mentionableUsers: (props: { query: string }) => SuggestedUser[];
  afterUploadCallback: (failed: string[]) => void;
  clearInput: () => void;
  onDeleteThumbnail: (id: string) => void;
};

export const ChatContext = createContext<ChatContextType | null>(null);
export interface Data {
  uploaded_ids?: { id: number }[];
  failed?: { name: string; errorCode: string }[];
}

export const ChatContextProvider = ({
  onSave,
  onFileUpload,
  onDeleteThumbnail,
  setMentionableUsers,
  children,
}: {
  onSave?: (editor: Editor, mentions: SuggestedUser[]) => void;
  onFileUpload?: (files: CommentMedia[]) => Promise<Data>;
  onDeleteThumbnail: (id: string) => void;
  children: React.ReactNode;
  setMentionableUsers: (props: { query: string }) => SuggestedUser[];
}) => {
  const [editor, setEditor] = useState<Editor | undefined>();
  const [thumbnails, setThumbnails] = useState<CommentMedia[]>([]);

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
      setThumbnails,
      afterUploadCallback: (failed: string[]) => {
        setThumbnails(
          thumbnails.map((file) => {
            if (failed.includes(file.id)) {
              file.isLoadingMedia = false;
              //file.isError = true;
            } else {
              file.isLoadingMedia = false;
              //file.isError = false
            }
            return file;
          })
        );
      },

      addThumbnails: ({ files }: { files: CommentMedia[] }) => {
        setThumbnails((prev) => [...prev, ...files]);

        if (onFileUpload) {
          onFileUpload(files).then((data: Data) => {
            const failed = data.failed?.map((f) => f.name);
            setThumbnails((prev) => {
              return prev.map((file) => {
                file.isLoadingMedia = false;
                if (failed?.length && failed.includes(file.id)) {
                  file.isError = true;
                } else {
                  file.isError = false;
                }
                return file;
              });
            });
          });
        }
      },
      clearInput: () => {
        if (editor && !editor.isEmpty) {
          editor.commands.clearContent();
        }
        if (thumbnails.length > 0) setThumbnails([]);
      },

      onDeleteThumbnail: (id: string) => {
        onDeleteThumbnail(id);
      },

      removeThumbnail: (index: number) => {
        setThumbnails(thumbnails.filter((_, i) => i !== index));
      },
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
      onDeleteThumbnail,
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
