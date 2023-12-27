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

const parseBackground = (bkg: string) => {
  if (bkg.startsWith("#") || bkg.startsWith("rgb") || bkg.startsWith("hsl")) {
    return bkg;
  }
  return `url(${bkg}) repeat center center`;
};

export const MessagesContainer = styled.div<ChatArgs>`
  padding: ${({ theme }) => theme.space.md};
  margin: ${({ theme }) => `0 -${theme.space.md}`};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  background: ${({ chatBkg }) => `${parseBackground(chatBkg ?? defaultBkg)}`};
`;
