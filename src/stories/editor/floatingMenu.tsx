import { BubbleMenu, FloatingMenuProps } from "@tiptap/react/menus";
import styled from "styled-components";
import { IconButton } from "../buttons/icon-button";

import { ReactComponent as BoldIcon } from "../../assets/icons/bold-fill.svg";
import { ReactComponent as H1Icon } from "../../assets/icons/h1-fill.svg";
import { ReactComponent as H2Icon } from "../../assets/icons/h2-fill.svg";
import { ReactComponent as H3Icon } from "../../assets/icons/h3-fill.svg";
import { ReactComponent as ItalicIcon } from "../../assets/icons/italic-fill.svg";
import { ReactComponent as QuoteIcon } from "../../assets/icons/quote-fill.svg";

import { Card } from "../cards";

const StyledIconButton = styled(IconButton)``;

const MenuContainer = styled(Card)`
  padding: ${({ theme }) => theme.space.xxs};

  ${StyledIconButton} {
    :first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    :last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    :not(:first-child):not(:last-child) {
      border-radius: 0;
    }
  }
`;

export const FloatingMenu = (props: FloatingMenuProps) => {
  const { editor } = props;

  if (!editor) {
    return null;
  }

  return (
    <div>
      <BubbleMenu {...props} editor={editor}>
        <MenuContainer isFloating>
          <StyledIconButton
            size={"small"}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            isBasic={!editor.isActive("heading", { level: 1 })}
            isPrimary={editor.isActive("heading", { level: 1 })}
            isPill={false}
          >
            <H1Icon key="ug-h1-button-bubble-menu" />
          </StyledIconButton>
          <StyledIconButton
            size={"small"}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isBasic={!editor.isActive("heading", { level: 2 })}
            isPrimary={editor.isActive("heading", { level: 2 })}
            isPill={false}
          >
            <H2Icon key="ug-h2-button-bubble-menu" />
          </StyledIconButton>
          <StyledIconButton
            size={"small"}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            isBasic={!editor.isActive("heading", { level: 3 })}
            isPrimary={editor.isActive("heading", { level: 3 })}
            isPill={false}
          >
            <H3Icon key="ug-h3-button-bubble-menu" />
          </StyledIconButton>

          <StyledIconButton
            size={"small"}
            onClick={() => editor.chain().focus().toggleBold().run()}
            isBasic={!editor.isActive("bold")}
            isPrimary={editor.isActive("bold")}
            isPill={false}
          >
            <BoldIcon key="ug-bold-button-bubble-menu" />
          </StyledIconButton>
          <StyledIconButton
            size={"small"}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isBasic={!editor.isActive("italic")}
            isPrimary={editor.isActive("italic")}
            isPill={false}
          >
            <ItalicIcon key="ug-italic-button-bubble-menu" />
          </StyledIconButton>
          <StyledIconButton
            size={"small"}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isBasic={!editor.isActive("blockquote")}
            isPrimary={editor.isActive("blockquote")}
            isPill={false}
          >
            <QuoteIcon key="ug-quote-button-bubble-menu" />
          </StyledIconButton>
        </MenuContainer>
      </BubbleMenu>
    </div>
  );
};
