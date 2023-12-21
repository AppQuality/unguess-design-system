import styled from "styled-components";
import { Card } from "../../cards";

export const ChatContainer = styled(Card)`
  padding: ${({ theme }) => theme.space.md};
`;

export const ChatBoxContainer = styled.div`
  display: flex;
`;

export const MessagesContainer = styled.div``;
