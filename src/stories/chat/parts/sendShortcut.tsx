import { Tag } from "@zendeskgarden/react-tags";
import { SM } from "@zendeskgarden/react-typography";
import styled from "styled-components";
import { isMac } from "../../theme/utils";

const ShortcutContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.base * 4}px`};
  background-color: ${({ theme }) => theme.palette.grey[100]};
`;

const Text = styled(SM)`
  line-height: 1.7;
`;

export const SendShortcut = ({ saveText }: { saveText?: string }) => {
  return (
    <ShortcutContainer>
      <Tag>{isMac() ? "Cmd" : "Ctrl"}+enter</Tag>&nbsp;
      <Text>{saveText || "to save"}</Text>
    </ShortcutContainer>
  );
};
