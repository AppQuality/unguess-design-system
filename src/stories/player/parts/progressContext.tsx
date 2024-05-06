import React, { createContext, useContext, useMemo, useState } from "react";
import { IBookmark } from "../_types";

export type ProgressContextType = {
  reset: () => void;
  isGrabbing: boolean;
  setIsGrabbing: React.Dispatch<React.SetStateAction<boolean>>;
  fromEnd: boolean;
  setFromEnd: React.Dispatch<React.SetStateAction<boolean>>;
  activeBookmark?: IBookmark;
  setactiveBookmark: React.Dispatch<
    React.SetStateAction<IBookmark | undefined>
  >;
};

export const ProgressContext = createContext<ProgressContextType | null>(null);

export const ProgressContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isGrabbing, setIsGrabbing] = useState<boolean>(false);
  const [fromEnd, setFromEnd] = useState<boolean>(false);
  const [activeBookmark, setactiveBookmark] = useState<IBookmark | undefined>(
    undefined
  );

  const progressContextValue = useMemo(
    () => ({
      isGrabbing,
      fromEnd,
      activeBookmark,
      setIsGrabbing,
      setFromEnd,
      setactiveBookmark,
      reset: () => {
        setIsGrabbing(false);
        setFromEnd(false);
        setactiveBookmark(undefined);
      },
    }),
    [isGrabbing, fromEnd, activeBookmark]
  );

  return (
    <ProgressContext.Provider value={progressContextValue}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgressContext = () => {
  const context = useContext(ProgressContext);

  if (!context)
    throw new Error("Provider not found for ProgressContextProvider");

  return context; // Now we can use the context in the component, SAFELY.
};
