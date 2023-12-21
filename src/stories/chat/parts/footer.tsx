import styled from "styled-components";
import { Tag } from "../../tags";
import { isMac } from "../../theme/utils";
import { SM } from "../../typography/typescale";
import { deleteProps } from "@tiptap/react";
import { PropsWithChildren } from "react";

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${({ theme }) => theme.space.sm};
  background-color: ${({ theme }) => theme.palette.grey[100]};
`;

const Text = styled(SM)`
  line-height: 1.7;
`;

export const ChatFooter = ({
  saveText,
  children,
}: PropsWithChildren<{ saveText?: string }>) => {
  return (
    <>
      <Footer>
        <Tag>{isMac() ? "Cmd" : "Ctrl"}+enter</Tag>&nbsp;
        <Text>{saveText || "to save"}</Text>
      </Footer>
      {children}
    </>
  );
};
