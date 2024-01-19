import styled from "styled-components";
import { PropsWithChildren } from "react";
import { SendShortcut } from "./sendShortcut";

const Footer = styled.div<{ showShortcut?: boolean }>`
  display: flex;
  flex-direction: row;
  padding: ${({ theme }) => `${theme.space.sm} 0px`};
  align-items: center;
  margin: ${({ theme }) => `0 -${theme.space.base * 4}px`};
  justify-content: ${({ showShortcut }) =>
    showShortcut ? "space-between" : "flex-end"};
  gap: ${({ theme }) => theme.space.xs};
  background-color: ${({ theme }) => theme.palette.grey[100]};
`;

export const ChatFooter = ({
  saveText,
  children,
  showShortcut,
}: PropsWithChildren<{ saveText?: string; showShortcut?: boolean }>) => {
  return (
    <>
      <Footer showShortcut={showShortcut}>
        {showShortcut ? (
          <>
            <SendShortcut saveText={saveText} />
            {children}
          </>
        ) : (
          children
        )}
      </Footer>
    </>
  );
};
