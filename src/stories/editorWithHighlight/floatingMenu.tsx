import { BubbleMenuPluginProps } from "@tiptap/extension-bubble-menu";
import { BubbleMenu, Editor } from "@tiptap/react";
import styled from "styled-components";
import { ReactComponent as TagIcon } from "../../assets/icons/tag-stroke.svg";

import { Button } from "../buttons/button";

type ShouldShowProps = Parameters<
  NonNullable<BubbleMenuPluginProps["shouldShow"]>
>[0];

const MenuContainer = styled.div`
  box-shadow: ${({ theme }) => theme.shadows.boxShadow(theme)};
  display: flex;
`;

export const FloatingMenu = (props: {
  editor: Editor;
  onClick: () => void;
}) => {
  const { editor, onClick } = props;

  const shouldShow = (props: ShouldShowProps): boolean => {
    // At least a word selected?", props.from !== props.to);
    return props.from !== props.to;
  };

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu editor={editor} shouldShow={shouldShow}>
      <MenuContainer className="bubble-menu">
        <Button isAccent isPrimary onClick={onClick}>
          <Button.StartIcon>
            <TagIcon />
          </Button.StartIcon>
          Create Observation
        </Button>
      </MenuContainer>
    </BubbleMenu>
  );
};
