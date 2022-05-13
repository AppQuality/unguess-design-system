import { Field } from "@zendeskgarden/react-dropdowns";
import { Dropdown, Select } from "../../../dropdowns/select";

import { Menu, Separator } from "../../../dropdowns/menu";
import { Item } from "../../../dropdowns/item";
import { MenuHeaderItem } from "../../../dropdowns/menuheader";
import { useState } from "react";
import { Workspace, WorkspaceDropdownArgs } from "./_types";
import { theme } from "../../../theme";
import { MD } from "../../../typography/typescale";
import { Ellipsis } from "../../../typography/ellipsis";
import styled from "styled-components";

const StyledEllipsis = styled(Ellipsis)<{ isCompact?: boolean }>`
  ${({ theme, isCompact }) =>
    isCompact &&
    `
    width: ${theme.components.chrome.nav.workspaceDropdownWidth}px; 
  `}
`;

export const WorkspacesDropdown = (props: WorkspaceDropdownArgs) => {
  const [selectedWorkspace, setSelectedWorkspace] = useState(
    props.activeWorkspace
  );
  return (
    <Dropdown
      selectedItem={selectedWorkspace}
      onSelect={(workspace) => {
        setSelectedWorkspace(workspace);
        props.onWorkspaceChange && props.onWorkspaceChange(workspace);
      }}
      downshiftProps={{
        itemToString: (item: Workspace) => item && item.company,
      }}
    >
      <Field>
        <Select style={{ color: theme.colors.primaryHue }}>
          <StyledEllipsis isCompact={props.isCompact}>
            {selectedWorkspace
              ? selectedWorkspace.company + "'s workspace"
              : "Select workspace"}
          </StyledEllipsis>
        </Select>
      </Field>
      <Menu>
        <MenuHeaderItem>
          <MD isBold style={{ color: theme.palette.grey[800] }}>
            {props.workspacesLabel || "Workspaces"}
          </MD>
        </MenuHeaderItem>
        <Separator />
        {props.workspaces && props.workspaces.map((item) => (
          <Item value={item}>{item.company}</Item>
        ))}
      </Menu>
    </Dropdown>
  );
};
