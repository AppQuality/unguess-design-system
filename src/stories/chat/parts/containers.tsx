import styled from "styled-components";
import { Card } from "../../cards";
import { ChatArgs } from "../_types";
import { FauxInput } from "@zendeskgarden/react-forms";
import { editorStyle, readOnlyStyle } from "../../shared/editorStyle";

export const ChatContainer = styled(Card)`
  padding: ${({ theme }) => `0 ${theme.space.base * 4}px`};
  &:hover {
    box-shadow: none;
  }
  cursor: default;
`;

export const MessagesContainer = styled.div<ChatArgs>`
  padding: ${({ theme }) => `${theme.space.md} ${theme.space.sm}`};
  margin: ${({ theme }) => `0 -${theme.space.base * 4}px`};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
  background: ${({ chatBkg }) => chatBkg ?? `#fff`};
  overflow-y: auto;
  border-top: ${({ theme }) => `1px solid ${theme.palette.grey[200]}`};
`;

export const EditorContainer = styled(FauxInput)<{ editable: boolean }>`
  ${({ editable, theme }) =>
    !editable
      ? readOnlyStyle
      : `
    margin-left: ${theme.space.sm};
    padding: ${`${theme.space.xxs} ${theme.space.xs}`};
      
    `}

  .ProseMirror {
    background-color: transparent;
    min-height: 36px;
    outline: none;
    max-height: 210px;
    overflow-y: auto;

    ${editorStyle}
  }
`;