import { HeaderItem as ZendeskHeaderItem } from "@zendeskgarden/react-chrome";
import styled from "styled-components";
import { BrandItemArgs, Workspace } from "./_types";
import { HeaderItemIcon } from "./headerItemIcon";
import { HeaderItemText } from "./headerItemText";
import { Logo } from "../../../logo";
import { ReactComponent as MenuIcon } from "../../../../assets/icons/menu-stroke.svg";
import { Dropdown, Select } from "../../../dropdowns/select";
import { Field } from "@zendeskgarden/react-dropdowns";
import { Menu, Separator } from "../../../dropdowns/menu";
import { Item } from "../../../dropdowns/item";
import { MenuHeaderItem } from "../../../dropdowns/menuheader";
import { useState } from "react";
import { theme } from "../../../theme";
import { MD } from "../../../typography/typescale";

export const LogoIconContainer = styled(ZendeskHeaderItem)`
  margin-right: 2px;
  border-right: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    right: 0;
    left: 0;
    margin-right: auto;
    margin-left: auto;
    position: absolute;
  }
`;

const BrandName = styled(ZendeskHeaderItem)`
  margin-right: auto;
  margin-left: -8px;
  color: ${({ theme }) => theme.palette.blue["600"]};
  pointer-events: none;
  font-family: ${({ theme }) => theme.fonts.system};
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const DropdownItem = styled(ZendeskHeaderItem)`
  margin-right: auto;
  margin-left: -8px;
  color: ${({ theme }) => theme.palette.blue["600"]};
  font-family: ${({ theme }) => theme.fonts.system};
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const MenuItem = styled(ZendeskHeaderItem)`
  color: ${({ theme }) => theme.palette.blue["600"]};
  position: absolute;
  left: 0;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const BrandItem = (props: BrandItemArgs) => {
  const [selectedWorkspace, setSelectedWorkspace] = useState(
    props.activeWorkspace
  );

  return (
    <>
      <MenuItem {...props} onClick={props.toggleMenu}>
        <HeaderItemIcon>
          <MenuIcon />
        </HeaderItemIcon>
        {props.menuLabel && <HeaderItemText>{props.menuLabel}</HeaderItemText>}
      </MenuItem>
      <LogoIconContainer {...props} hasLogo>
        <HeaderItemIcon>
          <Logo type={"icon"} size={150} />
        </HeaderItemIcon>
      </LogoIconContainer>

      {props.workspaces && props.workspaces.length > 1 ? (
        <DropdownItem>
          <Dropdown
            selectedItem={selectedWorkspace}
            onSelect={(workspace) => {
              setSelectedWorkspace(workspace);
              props.onWorkspaceChange && props.onWorkspaceChange(workspace);
            }}
            downshiftProps={{
              itemToString: (item: Workspace) => item && item.name,
            }}
          >
            <Field>
              <Select style={{ color: theme.colors.primaryHue }}>
                {selectedWorkspace
                  ? selectedWorkspace.name + "'s workspace"
                  : "Select workspace"}
              </Select>
            </Field>
            <Menu>
              <MenuHeaderItem>
                <MD isBold style={{ color: theme.palette.grey[800] }}>
                  {props.workspacesLabel || "Workspaces"}
                </MD>
              </MenuHeaderItem>
              <Separator />
              {props.workspaces.map((item) => (
                <Item value={item}>{item.name}</Item>
              ))}
            </Menu>
          </Dropdown>
        </DropdownItem>
      ) : (
        <>
          {props.brandName && (
            <BrandName {...props}>
              <HeaderItemText>{props.brandName}</HeaderItemText>
            </BrandName>
          )}
        </>
      )}
    </>
  );
};

export { BrandItem };
