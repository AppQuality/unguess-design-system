import styled from "styled-components";
import { PropsWithChildren } from "react";

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${({ theme }) => `${theme.space.sm} 0`};
  justify-content: flex-end;
  gap: ${({ theme }) => theme.space.xs};
`;

export const ChatFooter = ({
  saveText,
  children,
}: PropsWithChildren<{ saveText?: string }>) => {
  return (
    <>
      <Footer>{children}</Footer>
    </>
  );
};
