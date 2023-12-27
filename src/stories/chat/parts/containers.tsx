import styled from "styled-components";
import { Card } from "../../cards";
import { ChatArgs } from "../_types";
import defaultBkg from "../defaultBkg.svg";

export const ChatContainer = styled(Card)`
  padding: ${({ theme }) => theme.space.md};
  &:hover {
    box-shadow: none;
  }
  cursor: default;
`;

export const MessagesContainer = styled.div<ChatArgs>`
  padding: ${({ theme }) => theme.space.md};
  margin: ${({ theme }) => `0 -${theme.space.md}`};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  background: ${({ chatBkg }) => chatBkg ?? `url(${defaultBkg}) repeat center center`};
`;
