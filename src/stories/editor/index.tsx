import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styled from "styled-components";
import { LG } from "../typography/typescale";
import H1 from "./bindings/H1";
import { EditorArgs } from "./_types";

const EditorContainer = styled.div`
  .ProseMirror {
    padding: ${({ theme }) => theme.space.md};
    border: 2px solid ${({ theme }) => theme.palette.blue["300"]};
    border-radius: ${({ theme }) => theme.borderRadii.md};
    background-color: #fff;
    min-height: 100px;
    outline: none;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.1;
      font-weight: ${({ theme }) => theme.fontWeights.bold};
    }

    b,
    strong {
      font-weight: ${({ theme }) => theme.fontWeights.bold};
    }

    code {
      background-color: rgba(#616161, 0.1);
      color: #616161;
    }

    pre {
      background: #0d0d0d;
      color: #fff;
      font-family: "JetBrainsMono", monospace;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;

      code {
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8rem;
      }
    }

    img {
      max-width: 100%;
      height: auto;
    }

    blockquote {
      padding-left: 1rem;
      border-left: 2px solid rgba(#0d0d0d, 0.1);
    }

    hr {
      border: none;
      border-top: 2px solid rgba(#0d0d0d, 0.1);
      margin: 2rem 0;
    }
  }
`;

/**
 * Editor is a wrapper around TipTap/ProseMirror 
 * <br>
 * It's a rich text WYSIWYG editors.
 * <hr>
 * Used for this:
    - To allow text customization with markup supports
    - To develop collaborative text editing
   
   Not for this:
    - Simple text input, use textarea instead.
 */
const Editor = (props: EditorArgs) => {
  const { content, onUpdate } = props;
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable an included extension
        history: false,

        // Configure an included extension
        heading: {
          levels: [1, 2],

          HTMLAttributes: {
            class: "ciolla",
          },
        },
      }),
    ],
    content: content || "<p>Hello World!</p>",
    onUpdate,
  });

  if (!editor) {
    return null;
  }

  return (
    <EditorContainer>
      <EditorContent editor={editor} />
    </EditorContainer>
  );
};

export { Editor };
