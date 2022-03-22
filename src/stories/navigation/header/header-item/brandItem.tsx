import { HeaderItem as ZendeskHeaderItem } from "@zendeskgarden/react-chrome";
import styled from "styled-components";
import { BrandItemArgs } from "./_types";
import { HeaderItemIcon, HeaderItemText } from ".";
import { Logo } from "../../../logo";
import { ReactComponent as MenuIcon } from "@zendeskgarden/svg-icons/src/16/menu-stroke.svg";

import { Type as LogoTypes } from "../../../logo/_types";

const LogoIconContainer = styled(ZendeskHeaderItem)`
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
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const MenuItem = styled(ZendeskHeaderItem)`
  color: ${({ theme }) => theme.palette.blue["600"]};
  pointer-events: none;
  position: absolute;
  left: 0;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const BrandItem = (props: BrandItemArgs) => {
  return (
    <>
      <MenuItem>
        <HeaderItemIcon>
          <MenuIcon />
        </HeaderItemIcon>
        <HeaderItemText>menu</HeaderItemText>
      </MenuItem>
      <LogoIconContainer {...props} hasLogo>
        <HeaderItemIcon>
          <Logo type={LogoTypes.icon} />
        </HeaderItemIcon>
      </LogoIconContainer>

      {props.brandName && (
        <BrandName {...props}>
          <HeaderItemText>{props.brandName}</HeaderItemText>
        </BrandName>
      )}
    </>
  );
};

export { BrandItem };
