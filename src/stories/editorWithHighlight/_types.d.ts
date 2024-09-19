import "@tiptap/core"; // Assicurati di importare il modulo prima

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    annotation: {
      addAnnotation: (type: string, data: any) => ReturnType;
      updateAnnotation: (id: string, data: any) => ReturnType;
      deleteAnnotation: (id: string) => ReturnType;
    };
  }
}
