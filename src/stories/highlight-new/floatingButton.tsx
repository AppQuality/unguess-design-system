import { BubbleMenuPluginProps } from "@tiptap/extension-bubble-menu";
import { BubbleMenu } from "@tiptap/react";
import styled from "styled-components";
import { ReactComponent as TagIcon } from "../../assets/icons/tag-stroke.svg";
import { FloatingMenuArgs } from "./_types";

import { Button } from "../buttons/button";

type ShouldShowProps = Parameters<
  NonNullable<BubbleMenuPluginProps["shouldShow"]>
>[0];

const MenuContainer = styled.div`
  box-shadow: ${({ theme }) => theme.shadows.boxShadow(theme)};
  display: flex;
`;

export const FloatingMenu = (props: FloatingMenuArgs) => {
  const { editor, triggerSelection } = props;

  const shouldShow = (props: ShouldShowProps): boolean => {
    // At least a word selected?", props.from !== props.to);
    return props.from !== props.to;
  };

  if (!editor) {
    return null;
  }

  // console.log("🚀 ~ FloatingMenu ~ highlight:", highlight);
  return (
    <BubbleMenu editor={editor} shouldShow={shouldShow}>
      <MenuContainer className="bubble-menu">
        <Button isAccent isPrimary onClick={triggerSelection}>
          <Button.StartIcon>
            <TagIcon />
          </Button.StartIcon>
          Create Observation
        </Button>
      </MenuContainer>
    </BubbleMenu>
  );
};
