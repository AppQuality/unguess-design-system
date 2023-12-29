import styled from "styled-components";
import { Card } from "../../cards";
import { ChatArgs } from "../_types";

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
`;
