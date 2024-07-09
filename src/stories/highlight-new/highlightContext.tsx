import { Editor } from "@tiptap/react";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { HighlightRange, Observation } from "./_types";

export type HighlightContextType = {
  searchTerm: string;
  triggerSave: () => void;
  editor?: Editor;
  setEditor: React.Dispatch<React.SetStateAction<Editor | undefined>>;
  currentSelection: (HighlightRange & { text: string }) | null;
  setCurrentSelection: React.Dispatch<
    React.SetStateAction<(HighlightRange & { text: string }) | null>
  >;
};

export const HighlightContext = createContext<HighlightContextType | null>(
  null
);

const getObservations = (editor: Editor) => {
  const result: Observation[] = [];

  editor.state.doc.descendants((node) => {
    if (node.type.name === "observation") {
      // Add only if it's not already in the array
      if (!result.some((r) => r.id === node.attrs.id))
        result.push({
          id: node.attrs.id,
          start: node.attrs.start,
          end: node.attrs.end,
        });
    }
  });

  return result;
};

export const HighlightContextProvider = ({
  term,
  onSave,
  children,
}: {
  term?: string;
  onSave?: (editor: Editor, observations: Observation[]) => void;
  children: React.ReactNode;
}) => {
  const [editor, setEditor] = useState<Editor | undefined>();
  const [searchTerm, setsearchTerm] = useState<string>(term ?? "");
  const [currentSelection, setCurrentSelection] =
    useState<HighlightRange & {text: string} | null>(null);

  useEffect(() => {
    setsearchTerm(term ?? "");
  }, [term]);

  const HighlightContextValue = useMemo(
    () => ({
      searchTerm,
      editor,
      setEditor,
      currentSelection,
      setCurrentSelection,
      triggerSave: () => {
        if (editor && onSave && !editor.isEmpty) {
          onSave(editor, getObservations(editor));
        }
      },
    }),
    [currentSelection, editor, onSave, searchTerm]
  );

  return (
    <HighlightContext.Provider value={HighlightContextValue}>
      {children}
    </HighlightContext.Provider>
  );
};

export const useHighlightContext = () => {
  const context = useContext(HighlightContext);

  if (!context)
    throw new Error("Provider not found for HighlightContextProvider");

  return context; // Now we can use the context in the component, SAFELY.
};
