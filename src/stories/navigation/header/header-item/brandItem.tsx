import { HeaderItem as ZendeskHeaderItem } from "@zendeskgarden/react-chrome";
import styled from "styled-components";
import { BrandItemArgs } from "./_types";
import { HeaderItemIcon } from "./headerItemIcon";
import { HeaderItemText } from "./headerItemText";
import { Logo } from "../../../logo";
import { ReactComponent as MenuIcon } from "../../../../assets/icons/menu-stroke.svg";
import { WorkspacesDropdown } from "./workspacesDropdown";

export const LogoIconContainer = styled(ZendeskHeaderItem)`
  margin-right: 2px;
  border-right: none;
  cursor: pointer;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
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
  color: ${({ theme }) => theme.components.colors.primaryText};
  pointer-events: none;
  font-family: ${({ theme }) => theme.fonts.system};
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const DropdownItem = styled(ZendeskHeaderItem)`
  margin-right: auto;
  margin-left: -8px;
  color: ${({ theme }) => theme.components.colors.primaryText};
  font-family: ${({ theme }) => theme.fonts.system};
  z-index: 2;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const MenuItem = styled(ZendeskHeaderItem)`
  color: ${({ theme }) => theme.components.colors.primaryText};
  position: absolute;
  left: 0;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const BrandItem = (props: BrandItemArgs) => {
  const { menuLabel, toggleMenu, ...rest } = props;

  return (
    <>
      <MenuItem onClick={toggleMenu}>
        <HeaderItemIcon>
          <MenuIcon />
        </HeaderItemIcon>
        {menuLabel && <HeaderItemText>{menuLabel}</HeaderItemText>}
      </MenuItem>
      <LogoIconContainer {...rest} hasLogo>
        <HeaderItemIcon>
          <Logo type={"icon"} size={150} />
        </HeaderItemIcon>
      </LogoIconContainer>

      {props.workspaces && props.workspaces.length > 1 ? (
        <DropdownItem>
          <WorkspacesDropdown
            workspaces={props.workspaces}
            workspacesLabel={props.workspacesLabel}
            activeWorkspace={props.activeWorkspace}
            onWorkspaceChange={props.onWorkspaceChange}
          />
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
