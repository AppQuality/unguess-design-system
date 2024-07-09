import { FauxInput } from "@zendeskgarden/react-forms";
import { styled } from "styled-components";
import { editorStyle, readOnlyStyle } from "../shared/editorStyle";

export const EditorContainer = styled(FauxInput)<{
  editable: boolean;
  writingsuggestions: boolean;
}>`
  ${({ editable, theme }) =>
    editable === false
      ? readOnlyStyle
      : `
  margin-left: ${theme.space.sm};
  padding: ${`${theme.space.xxs} ${theme.space.xs}`};

  .ProseMirror {
    min-height: 36px;
    outline: none;
    overflow-y: auto;
  }
  `}

  .ProseMirror {
    background-color: transparent;

    ${editorStyle}
  }

  border: none;
`;
