import React from "react";
import styled from "styled-components";
import { isMac } from "../theme/utils";
import { SM } from "../typography/typescale";
import { ReactComponent as CmdIcon } from "./assets/cmd.svg";

const ShortcutTagWrapper = styled.div`
  padding: 10px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.blue[100]};
  color: ${({ theme }) => theme.palette.grey[700]};
  cursor: default;
  user-select: none;
  ${SM} {
    display: flex;
  }
`;

type ShortcutContent =
  | { text: React.ReactNode; ctrl?: never }
  | { ctrl: true; text?: never };

export type ShortcutTagProps = ShortcutContent &
  React.HTMLAttributes<HTMLDivElement>;

const ShortcutTag = (props: ShortcutTagProps) => {
  return (
    <ShortcutTagWrapper {...props}>
      <SM isBold>
        {props.ctrl ? !isMac() ? <CmdIcon width={16} /> : "Ctrl" : null}
        {props.text ? props.text : null}
      </SM>
    </ShortcutTagWrapper>
  );
};

export { ShortcutTag };
