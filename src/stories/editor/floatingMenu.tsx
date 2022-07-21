import { BubbleMenu } from "@tiptap/react";
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

const MenuContainer = styled(Card)`
  padding: ${({ theme }) => theme.space.xxs};
`;


export const FloatingMenu = (props: FloatingMenuArgs) => {
  const { editor } = props;

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu {...props} editor={editor}>
      <MenuContainer isFloating>
        <IconButton
          size={"small"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          isBasic={!editor.isActive("bold")}
          isPill={false}
        >
          {editor.isActive("bold") ? <BoldIconActive /> : <BoldIcon />}
        </IconButton>
        <IconButton
          size={"small"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isBasic={!editor.isActive("italic")}
          isPill={false}
        >
          {editor.isActive("italic") ? <ItalicIconActive /> : <ItalicIcon />}
        </IconButton>
        <IconButton
          size={"small"}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isBasic={!editor.isActive("blockquote")}
          isPill={false}
        >
          {editor.isActive("blockquote") ? <QuoteIconActive /> : <QuoteIcon />}
        </IconButton>
      </MenuContainer>
    </BubbleMenu>
  );
};
