import styled from "styled-components";
import { IconButton } from "../buttons/icon-button";
import { FloatingMenuArgs } from "./_types";

import { ReactComponent as BoldIconActive } from "../../assets/icons/bold-fill.svg";
import { ReactComponent as BoldIcon } from "../../assets/icons/bold-stroke.svg";
import { ReactComponent as ItalicIconActive } from "../../assets/icons/italic-fill.svg";
import { ReactComponent as ItalicIcon } from "../../assets/icons/italic-stroke.svg";
import { ReactComponent as QuoteIconActive } from "../../assets/icons/quote-fill.svg";
import { ReactComponent as QuoteIcon } from "../../assets/icons/quote-stroke.svg";

import { Card } from "../cards";
import { Tag } from "../tags";
import { isMac } from "../theme/utils";
import { SM } from "../typography/typescale";

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${({ theme }) => theme.space.sm} 16px;
  background-color: ${({ theme }) => theme.palette.grey[100]};
`;

const Text = styled(SM)`
  line-height: 1.7;
`;

export const EditorFooter = ({ saveText }: { saveText?: string }) => {
  return <Footer>
    <Tag>{isMac() ? "Cmd" : "Ctrl"}+enter</Tag>&nbsp;
    <Text>{saveText || "to save"}</Text>
  </Footer>;
};
