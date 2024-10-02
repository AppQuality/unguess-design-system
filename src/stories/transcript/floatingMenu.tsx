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
  onClick: (editor: Editor, words: { start: number; end: number }) => void;
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
        <Button
          isAccent
          isPrimary
          onClick={() => {
            const { from, to } = editor.state.selection;

            let start: number = 0;
            let end: number = 0;
            editor.state.doc.nodesBetween(from, to, (node) => {
              if (node.type.name === "Word") {
                if (!start) start = node.attrs["data-start"];
                end = node.attrs["data-end"];
              }
            });
            if (start === end) return;
            onClick(editor, { start, end });
          }}
        >
          <Button.StartIcon>
            <TagIcon />
          </Button.StartIcon>
          Create Observation
        </Button>
      </MenuContainer>
    </BubbleMenu>
  );
};
