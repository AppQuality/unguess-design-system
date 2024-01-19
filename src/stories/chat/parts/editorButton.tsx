import { Editor } from "@tiptap/react";
import { ReactComponent as BoldIcon } from "../../../assets/icons/bold-fill.svg";
import { ReactComponent as ItalicIcon } from "../../../assets/icons/italic-fill.svg";
import { styled } from "styled-components";
import { IconButton } from "../../buttons/icon-button";

const MentionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const EditorButton = ({
  editor,
  type,
}: {
  editor: Editor;
  type: "bold" | "italic" | "mention";
}) => {

  const isActive = editor.isActive(type);

  const getIcon = () => {
    switch (type) {
      case "bold":
        return <BoldIcon />;
      case "italic":
        return <ItalicIcon />;
      case "mention":
        return <MentionIcon>@</MentionIcon>;
    }
  };

  const handleClick = () => {
    switch (type) {
      case "bold":
        return editor.chain().focus().toggleBold().run();
      case "italic":
        return editor.chain().focus().toggleItalic().run();
      case "mention":
        const { from } = editor.state.selection;
        const char = from > 1 ? " @" : "@";
        return editor.commands.insertContent(char);
    }
  };

  return (
    <IconButton size={"small"} isBasic={!isActive} isPrimary={isActive} onClick={handleClick}>
      {getIcon()}
    </IconButton>
  );
};
