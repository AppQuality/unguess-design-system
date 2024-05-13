import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type HighlightContextType = {
  searchTerm: string;
};

export const HighlightContext = createContext<HighlightContextType | null>(
  null
);

export const HighlightContextProvider = ({
  term,
  children,
}: {
  term?: string;
  children: React.ReactNode;
}) => {
  const [searchTerm, setsearchTerm] = useState<string>(term ?? "");

  useEffect(() => {
    setsearchTerm(term ?? "");
  }, [term]);

  const HighlightContextValue = useMemo(
    () => ({
      searchTerm,
    }),
    [searchTerm]
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
