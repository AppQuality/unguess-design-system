import styled from "styled-components";
import { Card } from "../../cards";

export const ChatContainer = styled(Card)`
  padding: ${({ theme }) => theme.space.md};
  &:hover {
    box-shadow: none;
  }
  cursor: default;
`;

export const MessagesContainer = styled.div`
  padding: ${({ theme }) => `${theme.space.md} 0`};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`;
