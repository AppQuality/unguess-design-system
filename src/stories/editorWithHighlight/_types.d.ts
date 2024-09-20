import "@tiptap/core"; // Assicurati di importare il modulo prima

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    active: {
      setCurrentTime: (start: number) => ReturnType;
      updateCurrentActive: ({
        currentWord: { start: number, end: number },
      }) => ReturnType;
    };
  }
}