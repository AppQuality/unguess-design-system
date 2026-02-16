import styled from "styled-components";
import { Tag } from "../tags";
import { isMac } from "../theme/utils";
import { SM } from "../typography/typescale";
import { CommandBar } from "./bar";
import { Editor } from "@tiptap/react";

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${({ theme }) => theme.space.sm} 16px;
  background-color: ${({ theme }) => theme.palette.grey[100]};
`;

const Text = styled(SM)`
  line-height: 1.7;
`;

export const EditorFooter = ({
  saveText,
  showCommandBar,
  editor,
}: {
  saveText?: string;
  showCommandBar?: boolean;
  editor?: Editor;
}) => {
  return (
    <Footer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Tag>{isMac() ? "Cmd" : "Ctrl"}+enter</Tag>
          <Text>{saveText || "to save"}</Text>
        </div>
        {showCommandBar && (
          <CommandBar
            editor={editor}
            i18n={{ menu: { bold: "Bold text", italic: "Italic text" } }}
          />
        )}
      </div>
    </Footer>
  );
};
